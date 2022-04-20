import { request } from 'umi';

// 获取投标列表列表
export const getTenderList = async (params: any) => {
  const data = await request(`/api/fontEnd/tender/getTenderList`, {
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
