// Backend formularzy kontaktowych (katalog server/ w tym repo).
// Ścieżka względna działa, gdy nginx serwuje front i /api z tej samej domeny.
// Jeśli backend stoi pod inną domeną, wpisz pełny URL i włącz CORS po stronie serwera.
export const API_CONFIG = {
  formularzEndpoint: '/api/formularz',
};
