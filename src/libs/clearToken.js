//clear token

export function clearToken(res, payload) {
  // Create clear token

  return res.cookie(payload, "", {
    expires: new Date(0),
  });
}
