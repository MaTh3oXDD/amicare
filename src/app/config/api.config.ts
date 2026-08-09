// Endpoint własnego backendu, który odbiera zgłoszenia z formularza kontaktowego
// (POST, JSON: { imie, telefon, badanie, opis }). Podmień, gdy backend powstanie.
export const API_CONFIG = {
  surveyEndpoint: 'https://TWOJ-BACKEND/api/kontakt',
};
