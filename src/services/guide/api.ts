import { extend } from 'umi-request';
import { notification } from 'antd';
import { getToken } from '../../utils/index';

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): any => {
  const { response } = error;
  if (response && response.status) {
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: getToken() || '',
      },
    },
  };
});

// 响应
request.interceptors.response.use((res) => {
  return res;
});

/**
 * 获取指引列表
 */

// 获取政策法规
export const getPolicyList = async (params: any) => {
  const data = await request(`/api/fontEnd/guide/getPolicyList`, {
    method: 'GET',
    params,
  });
  return data;
};
// 获取办事指南
export const getInstructionList = async (params: any) => {
  const data = await request(`/api/fontEnd/guide/getInstructionList`, {
    method: 'GET',
    params,
  });
  return data;
};
// 获取下载中心
export const getDownloadList = async (params: any) => {
  const data = await request(`/api/fontEnd/guide/getDownloadList`, {
    method: 'GET',
    params,
  });
  return data;
};
// 获取党建工作
export const getPartyList = async (params: any) => {
  const data = await request(`/api/fontEnd/guide/getPartyList`, {
    method: 'GET',
    params,
  });
  return data;
};

// getCorrectAnnouncementList
