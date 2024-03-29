export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/dashboard',
              },
              {
                name: 'dashboard',
                path: '/dashboard',
                icon: 'PieChartOutlined',
                component: '@/pages/DashBoard',
              },
              {
                name: 'user',
                path: '/user',
                icon: 'UserOutlined',
                component: '@/pages/User',
              },
              {
                name: 'goods',
                path: '/goods',
                icon: 'ShoppingOutlined',
                component: '@/pages/Goods',
              },

              // {
              //   name: 'category',
              //   path: '/category',
              //   icon: 'ShoppingOutlined',
              //   component: '@/pages/Category',
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
