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
    routes: [
      {
        path: '/department/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
    //   routes: [
    //     {
    //   path: '/department',
    //   routes:[{
    //     name: 'welcome',
    //     path: '/welcome',
    //     component: './Welcome',
    //     // redirect: '/welcome',
    //   },
    // ]
    //   ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
