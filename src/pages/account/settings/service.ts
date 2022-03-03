import { request } from 'umi';
import type { CurrentUser } from './data';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/user/detail');
}
export async function baseSettings(
  data: any,
  options?: { [key: string]: any },
): Promise<{ data: CurrentUser }> {
  return request('/api/user/baseSettings', { method: 'POST', data, ...(options || {}) });
}
