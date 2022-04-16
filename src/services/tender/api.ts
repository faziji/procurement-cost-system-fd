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
 * 提交投标工单
 */
export const createTender = async (params: any) => {
  const data = await request(`/api/fontEnd/tender/createTender`, {
    method: 'POST',
    data: params,
  });
  return data;
};

// 获取投标工单，用于判断是否已投标
export const getTenderList = async (params: any) => {
  const data = await request(`/api/fontEnd/tender/getTenderList`, {
    method: 'GET',
    params,
  });
  return data;
};

// getTenderList
