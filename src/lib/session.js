function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

export function createSession({ spot, pricePerHour, user }) {
  const session = {
    id: makeId(),
    spot,
    pricePerHour,
    user,
    start: Date.now(),
    paid: false,
  };
  localStorage.setItem("parking_session", JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem("parking_session"));
  } catch (e) { return null }
}

export function clearSession() {
  localStorage.removeItem("parking_session");
}

export function updateSession(changes) {
  const s = getSession() || {};
  const merged = { ...s, ...changes };
  localStorage.setItem("parking_session", JSON.stringify(merged));
  return merged;
}
