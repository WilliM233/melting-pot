export const apiBase =
  import.meta.env.MODE === "production"
    ? "api.meltingpointproductions.com"
    : "http://localhost:3001";
