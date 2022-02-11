import { request } from 'umi';

/**
 * 用户登录
 *@param username 账号；password 密码
 */
export const login = async (params: any) => {
  const data = await request(`/api/user/login`, {
    method: 'POST',
    data: params,
  });
  return data;
};

/**
 * 获取用户详细信息
 *@param username 账号
 */
export const getCurrentUserInfo = async (query: any) => {
  const data = await request(`/api/user/detail`, {
    method: 'GET',
    params: query,
  });
  return data;
};
