/**
 * 可以在这里设置canAdmin的值，可以路由中判断是否有权限操作对应的路由页面
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};

  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
