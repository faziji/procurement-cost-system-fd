import { request } from 'umi';
import type { NoticeType, ActivitiesType, AnalysisData } from './data';

export async function queryProjectNotice(): Promise<{ data: NoticeType[] }> {
  return request('/api/project/notice');
}

export async function queryActivities(): Promise<{ data: ActivitiesType[] }> {
  return request('/api/activities');
}
// export async function getAttentionList(): Promise<any> {
//   return request('/api/fontEnd/resource/getAttentionList');
// }

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/fake_workplace_chart_data');
}

// 获取更正公告
export const getAttentionList = async (params: any) => {
  const data = await request(`/api/fontEnd/resource/getAttentionList`, {
    method: 'GET',
    params
  });
  return data;
};