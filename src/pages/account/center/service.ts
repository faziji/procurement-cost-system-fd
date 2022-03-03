import { request } from 'umi';
import type { CurrentUser } from './data.d';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/user/detail');
}
