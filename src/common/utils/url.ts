export function baseUrl(): string {
  return process.env.APP_URL;
}

export function url(path: string): string {
  if (!path) return null;
  return baseUrl() + path;
}
