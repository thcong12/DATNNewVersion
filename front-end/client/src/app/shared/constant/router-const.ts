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
  userName: 'userName',
};

export const apiRouter = {
  user: {
    user: '/user',
    cart: '/cart',
    add: '/add',
    remove: '/remove',
    library: '/library',
    wishlist: '/wishlist',
    recomend: '/recomend',
  },
  checkout: {
    checkout: '/checkout',
    order: '/order',
    pay: '/pay',
  },

  product: '/product',
  store: {
    sale: '/sale',
    slide: '/slide',
    release: '/release',
    bestseller: '/bestseller',
    filter: '/filter',
    search: '/search',
  },
};
