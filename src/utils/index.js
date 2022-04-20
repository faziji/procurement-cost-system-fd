/**
 * 获取本地token
 */
export const getToken = (name = 'fdToken') => {
  return localStorage.getItem(name);
};

/**
 * 获取当前用户信息
 */
export const getUserInfo = (name = 'fdUserInfo') => {
  return localStorage.getItem(name);
};

/**
 * 修改本地用户信息
 */
export const setCurrentUserInfo = (data, name = 'fdUserInfo') => {
  return localStorage.setItem(name, JSON.stringify(data));
};
