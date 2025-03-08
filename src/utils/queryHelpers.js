export function buildQueryString(params) {
  return new URLSearchParams(params).toString();
}