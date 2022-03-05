export const getToken = (tokenName = 'token') => {
  return localStorage.getItem(tokenName);
};
