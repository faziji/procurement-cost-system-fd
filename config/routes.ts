export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    layout: false, // 删除侧边栏和菜单栏
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
