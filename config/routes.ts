export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    layout: false, // 删除侧边栏和菜单栏
    component: './Welcome',
  },
  {
    path: '/register',
    name: 'register',
    icon: 'smile',
    layout: false, // 删除侧边栏和菜单栏
    component: './Register',
  },
  {
    path: '/department',
    name: 'department',
    layout: false, // 删除侧边栏和菜单栏
    component: './Department',
  },
  {
    path: '/policy',
    name: 'policy',
    layout: false, // 删除侧边栏和菜单栏
    component: './Policy',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
