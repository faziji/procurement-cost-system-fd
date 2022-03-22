export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    layout: false,
    component: './Welcome',
  },
  {
    path: '/register',
    name: 'register',
    icon: 'smile',
    layout: false,
    component: './Register',
  },
  // 部门概况
  {
    path: '/department',
    name: 'department',
    layout: false,
    component: './MenuPage/DOCX/Department',
  },
  // 政策法规
  {
    path: '/policy',
    name: 'policy',
    layout: false,
    component: './MenuPage/MENU/Policy',
  },
  // 办事指南
  {
    path: '/instruction',
    name: 'instruction',
    layout: false,
    component: './MenuPage/MENU/Instruction',
  },
  // 下载中心
  {
    path: '/download',
    name: 'download',
    layout: false,
    component: './MenuPage/MENU/Download',
  },
  // 党建工作
  {
    path: '/party',
    name: 'party',
    layout: false,
    component: './MenuPage/MENU/Party',
  },
  // 联系我们
  {
    path: '/contact',
    name: 'contact',
    layout: false,
    component: './MenuPage/DOCX/Contact',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
