export function getTokenFromHost() {
  // Host app (Super Qi) can inject a global, or pass token via query string
  try {
    if (window && window.__SUPER_QI_TOKEN) return window.__SUPER_QI_TOKEN;
  } catch (e) {}
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) return params.get("token");
  } catch (e) {}
  return null;
}
