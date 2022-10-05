export const configHeaders = (token) => {
  return { headers: { authorization: `Bearer ${token}` } };
};
