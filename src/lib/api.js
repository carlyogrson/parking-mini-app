/**
 * MiniApps auth endpoint
 * POST https://its.mouamle.space/api/auth-with-superQi
 * 
 * Request Body:
 * {
 *     "token": ""
 * }
 * 
 * Response:
 * {
 *     "token": "..." // The authentication token to use for subsequent requests
 * }
 */
export async function authWithSuperQi(authCode) {
  const response = await fetch('https://its.mouamle.space/api/auth-with-superQi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: authCode
    })
  });

  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Payment endpoint
 * POST https://its.mouamle.space/api/payment
 * 
 * Headers:
 * {
 *     "Content-Type": "application/json",
 *     "Authorization": token
 * }
 * 
 * Response:
 * {
 *     "url": "..." // Payment URL to use with my.tradePay()
 * }
 */
export async function payWithSuperQi(token) {
  const response = await fetch('https://its.mouamle.space/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  if (!response.ok) {
    throw new Error(`Payment request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

