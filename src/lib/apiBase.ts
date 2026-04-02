export function getApiBaseUrl() {
  // Läuft auf dem Server → absolute URL nötig
  if (typeof window === "undefined") {
    // 1. Versuche NEXT_PUBLIC_APP_URL
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }

    // 2. Versuche NEXT_SERVER_URL (optional)
    if (process.env.NEXT_SERVER_URL) {
      return process.env.NEXT_SERVER_URL;
    }

    // 3. Fallback: benutze die Host-Header von Next.js
    // (funktioniert in Dev, Prod, Docker, LAN)
    return "http://localhost:3000";
  }

  // Browser → relative URL
  return "";
}
