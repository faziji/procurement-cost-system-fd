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
    // exact: true,
    // component: './Department/Introduce',
    routes: [
      {
        path: '/department/introduce',
        name: 'introduce',
        icon: 'smile',
        component: './Department/Introduce',
      },
      {
        path: '/department/organization',
        name: 'organization',
        icon: 'smile',
        component: './Department/Organization',
      },
      {
        path: '/department/',
        redirect: '/department/introduce',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
