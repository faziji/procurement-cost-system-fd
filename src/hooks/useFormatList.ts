/**
 * 将list的所有小写转化为大写(仅仅用于测试)
 */
import { useMemo } from 'react';

function useFormatList(list: any) {
  return useMemo(
    () =>
      list.map((item: any) => {
        console.log(1111);
        return item.toUpperCase();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
export default useFormatList;
