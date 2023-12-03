export const routerURL = {
  home: '/home',
  auth: {
    login: '/login',
    logout: '/logout',
    refreshTk: '/reshfresh',
    accActive: (token: string) => {
      return `/actice/${token}`;
    },
    resetps: '/reset',
    changePasswork: (token: string) => {
      return `/changepasswork/${token}`;
    },
  },
  table: {
    product: '/product',
    category: '/category',
    developer: '/developer',
  },
  admin: {
    user: '/user',
  },
};
export const header = {
  accessTK: 'x-access-token',
  refreshTK: 'x-refresh-token',
};
