export const apiBase =
  import.meta.env.MODE === "production"
    ? "https://meltingpointproductions.com"
    : "http://localhost:3001";
