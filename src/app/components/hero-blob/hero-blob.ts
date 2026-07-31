import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

const CAMERA_Z = 7.5;
const CAMERA_FOV = 38;
const MODEL_URL = 'models/dna-helix.glb';
const MODEL_TARGET_SIZE = 17;
const MODEL_BASE_Y = 0.2;
const MODEL_BASE_ROTATION_Y = -(Math.PI / 6); // 30° right

function createGradientTexture(
  THREE: typeof import('three'),
  colorA: string,
  colorB: string,
): InstanceType<typeof THREE.CanvasTexture> {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(1, colorB);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

@Component({
  selector: 'app-hero-blob',
  standalone: true,
  templateUrl: './hero-blob.html',
  styleUrl: './hero-blob.scss',
})
export class HeroBlob implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  private zone = inject(NgZone);
  private reducedMotion =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  private resizeObserver?: ResizeObserver;
  private rafId?: number;
  private disposed = false;

  async ngAfterViewInit(): Promise<void> {
    const canvas = this.canvasRef.nativeElement;
    const host = canvas.parentElement as HTMLElement;

    let THREE: typeof import('three');
    let RoomEnvironment: typeof import('three/examples/jsm/environments/RoomEnvironment.js').RoomEnvironment;
    let GLTFLoader: typeof import('three/examples/jsm/loaders/GLTFLoader.js').GLTFLoader;
    try {
      [THREE, { RoomEnvironment }, { GLTFLoader }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/environments/RoomEnvironment.js'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
      ]);
    } catch {
      this.fallbackToImage(host);
      return;
    }
    if (this.disposed) return;

    let renderer: InstanceType<typeof THREE.WebGLRenderer>;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      this.fallbackToImage(host);
      return;
    }

    let model: InstanceType<typeof THREE.Group>;
    try {
      const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
      model = gltf.scene;
    } catch {
      this.fallbackToImage(host);
      return;
    }
    if (this.disposed) return;

    this.zone.runOutsideAngular(() => {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      // Brand navy deepening into a lighter steel-blue - same family as the
      // logo/site palette, no off-brand hues.
      scene.background = createGradientTexture(THREE, '#152a52', '#3d5c94');

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.08).texture;
      pmrem.dispose();

      const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
      camera.position.set(0, 0, CAMERA_Z);

      const group = new THREE.Group();
      scene.add(group);

      // Normalize the imported model: scale it to a consistent footprint, then
      // center it - the centering offset must itself be scaled, since position
      // is a translation applied on top of (not scaled by) the object's own scale.
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const modelScale = MODEL_TARGET_SIZE / maxDim;
      model.scale.setScalar(modelScale);
      model.position.copy(center).multiplyScalar(-modelScale);
      group.add(model);

      // The source file's own material is a near-black 30%-opacity grey - replace
      // it with a glassy, softly glowing look: translucent, low-roughness beads
      // with a faint inner emissive tint, echoing the reference render.
      model.traverse((obj) => {
        const mesh = obj as InstanceType<typeof THREE.Mesh>;
        if (!mesh.isMesh) return;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          const mat = m as InstanceType<typeof THREE.MeshPhysicalMaterial>;
          mat.color.set('#a9c3ef');
          mat.emissive = new THREE.Color('#3d8f6f');
          mat.emissiveIntensity = 0.22;
          mat.transmission = 0.5;
          mat.thickness = 0.7;
          mat.ior = 1.4;
          mat.roughness = 0.12;
          mat.metalness = 0.05;
          mat.clearcoat = 1;
          mat.clearcoatRoughness = 0.08;
          mat.opacity = 0.96;
          mat.transparent = true;
        });
      });

      const key = new THREE.DirectionalLight('#ffffff', 2.4);
      key.position.set(3, 4, 5);
      scene.add(key);

      const fill = new THREE.PointLight('#57b33a', 1.2, 15);
      fill.position.set(-4, -2, 3);
      scene.add(fill);

      const rim = new THREE.DirectionalLight('#8fb3ff', 1.1);
      rim.position.set(-3, 1.5, -4);
      scene.add(rim);

      scene.add(new THREE.AmbientLight('#ffffff', 0.35));

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      let baseX = 0;
      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        const aspect = w / h;
        const halfHeight = CAMERA_Z * Math.tan((CAMERA_FOV * Math.PI) / 360);
        const halfWidth = halfHeight * aspect;
        const isNarrow = aspect < 0.85;
        baseX = isNarrow ? 0 : halfWidth * 0.12;
        const scale = isNarrow ? 0.72 : w < 900 ? 0.85 : 1;
        group.scale.setScalar(scale);
      };
      resize();
      this.resizeObserver = new ResizeObserver(resize);
      this.resizeObserver.observe(host);

      const reduced = this.reducedMotion;
      const startTime = performance.now();

      group.position.set(baseX, MODEL_BASE_Y, 0);
      group.rotation.y = MODEL_BASE_ROTATION_Y;

      const tick = () => {
        if (this.disposed) return;
        const t = (performance.now() - startTime) / 1000;

        if (!reduced) {
          group.rotation.y = MODEL_BASE_ROTATION_Y + t * 0.2;
          group.rotation.x = Math.sin(t * 0.13) * 0.1;
        }

        renderer.render(scene, camera);
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);

      (this as unknown as { cleanupThree: () => void }).cleanupThree = () => {
        if (this.rafId !== undefined) cancelAnimationFrame(this.rafId);
        this.resizeObserver?.disconnect();
        model.traverse((obj) => {
          const mesh = obj as InstanceType<typeof THREE.Mesh>;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => (m as InstanceType<typeof THREE.Material>).dispose());
        });
        scene.environment?.dispose();
        renderer.dispose();
      };
    });
  }

  private fallbackToImage(host: HTMLElement): void {
    // .hero has no CSS background of its own (it relies on the canvas), so when
    // WebGL is unavailable we must paint a backdrop ourselves here too.
    host.style.background = 'linear-gradient(135deg, #152a52, #3d5c94)';
  }

  ngOnDestroy(): void {
    this.disposed = true;
    (this as unknown as { cleanupThree?: () => void }).cleanupThree?.();
  }
}
