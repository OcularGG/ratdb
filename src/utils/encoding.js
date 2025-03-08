export function encodeBase64(str) {
  return btoa(str);
}

export function decodeBase64(str) {
  return atob(str);
}