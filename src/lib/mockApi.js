export function pay(sessionId, amount) {
  // Simulate server side payment processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, sessionId, amount, paidAt: Date.now() });
    }, 900);
  });
}
