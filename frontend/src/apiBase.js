export const apiBase =
  import.meta.env.MODE === "production"
    ? "https://api.meltingpointproductions.com"
    : "http://localhost:3001";
