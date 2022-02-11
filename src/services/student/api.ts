import { request } from 'umi';

export const createStudents = async (params: any) => {
  const { data } = await request(`/student/student/create`, {
    method: 'POST',
    data: params,
  });
  return data;
};
