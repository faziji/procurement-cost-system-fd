/**
 * 获取本地token
 */
export const getToken = (name = 'fdToken') => {
  return localStorage.getItem(name);
};

/**
 * 获取当前用户信息
 */
export const getUerInfo = (name = 'fdUserInfo') => {
  return localStorage.getItem(name);
};
