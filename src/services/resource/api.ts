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
 * 获取资源列表
 */

// 获取征询意见
export const getConsultationList = async () => {
  const data = await request(`/api/fontEnd/resource/getConsultationList`, {
    method: 'GET',
  });
  return data;
};
// 获取征询意见详情
export const detailConsultation = async (params: any) => {
  const data = await request(`/api/fontEnd/resource/detailConsultation`, {
    method: 'GET',
    params,
  });
  return data;
};
// 获取采购公告
export const getPurchaseAnnouncementList = async () => {
  const data = await request(`/api/fontEnd/resource/getPurchaseAnnouncementList`, {
    method: 'GET',
  });
  return data;
};
// 获取采购结果详情
export const detailPurchaseAnnouncement = async (params: any) => {
  const data = await request(`/api/fontEnd/resource/detailPurchaseAnnouncement`, {
    method: 'GET',
    params,
  });
  return data;
};
// 获取结果公告
export const getResultAnnouncementList = async () => {
  const data = await request(`/api/fontEnd/resource/getResultAnnouncementList`, {
    method: 'GET',
  });
  return data;
};
// 获取结果公告详情
export const detailResultAnnouncement = async (params: any) => {
  const data = await request(`/api/fontEnd/resource/detailResultAnnouncement`, {
    method: 'GET',
    params,
  });
  return data;
};
// 获取更正公告
export const getCorrectAnnouncementList = async () => {
  const data = await request(`/api/fontEnd/resource/getCorrectAnnouncementList`, {
    method: 'GET',
  });
  return data;
};
// 获取更正公告详情
export const detailCorrectAnnouncement = async (params: any) => {
  const data = await request(`/api/fontEnd/resource/detailCorrectAnnouncement`, {
    method: 'GET',
    params,
  });
  return data;
};

// getCorrectAnnouncementList
