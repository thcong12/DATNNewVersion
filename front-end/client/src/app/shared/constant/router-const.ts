export const routerURL = {
  home: '/home',
  auth: {
    login: '/login',
    logout: '/logout',
    refreshTk: '/refresh',
    accActive: (token: string) => {
      return `/actice/${token}`;
    },
    resetps: '/reset',
    changePasswork: (token: string) => {
      return `/changepasswork/${token}`;
    },
    signin: '/signin',
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

export const apiRouter = {
  user: {
    user: '/user',
    cart: '/cart',
    add: '/add',
    remove: '/remove',
    library: '/library',
    wishlist: '/wishlist',
    // library: '/library',
  },
  product: '/product',
  store: {
    sale: '/sale',
    slide: '/slide',
    release: '/release',
    bestseller: '/bestseller',
  },
};
