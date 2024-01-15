import dotenv, { configDotenv } from "dotenv";

dotenv.config();
const JWT_ACCESS_ADMIN = process.env.JWT_ACCESS_ADMIN || "";
const JWT_ACCESS_USER = process.env.JWT_ACCESS_USER || "";
const JWT_SECRET = process.env.JWT_SECRET || "";
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 1337;
const MONGO_URL = process.env.MONGO_URL;
const EMAIL_ACCOUNT = process.env.EMAIL_USERNAME || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
const PORT = process.env.PORT;
const PORT_FE_CLIENT = process.env.PORT_FE_CLIENT;

export const CONSTANT = {
  ROLE: {
    TYPE_ADMIN_1ST: process.env.TYPE_ADMIN_1ST,
    TYPE_ADMIN_2ST: process.env.TYPE_ADMIN_2ST,
  },
  DEAFAULT_VALUE: {
    CATEGLORY: "63686974cc01e73abcfa0151",
    FEATURE: "63687d63cc01e73abcfa01dc",
    DEVELOPER: "63687a3ecc01e73abcfa01cf",
  },
  header: {
    accessToken: "x-access-token",
    refreshToken: "x-refresh-token",
  },
  api: {
    version: "v1",
    client: {
      version: "v1",
    },
  },
  mongoose: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  jwt: {
    accessAdmin: JWT_ACCESS_ADMIN,
    accessUser: JWT_ACCESS_USER,
    secret: JWT_SECRET,
  },
  email: {
    account: EMAIL_ACCOUNT,
    password: EMAIL_PASSWORD,
  },
  port: {
    server: PORT,
    clientFE: PORT_FE_CLIENT,
  },
  code_status: {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
  JWT_Secret_admin: {
    admin_1st: process.env.TYPE_ADMIN_1ST,
    admin_2st: process.env.TYPE_ADMIN_2ST,
  },
  expires_time: {
    refesh_time: process.env.EXPIRES_TIME_REFRESH,
    access_time: process.env.EXPIRES_TIME_ACCESS,
  },
  MODEL_NAME: {
    admin: "Admin",
    category: "Categlory",
    developer: "Developer",
    product: "Product",
    productDetail: "ProductDetail",
    wishList: "WishList",
    user: "User",
    order: "Order",
    orderDetail: "OrderDetail",
    cart: "Cart",
    libraly: "Libraries",
    homeSlide: "Sliders",
    dataRecomendraw: "Datasetforproducts",
    dataRecomendNew: "dataRecomendNew",
    dataRecomend: "dataRecomend",
    profile: "profiles",
    city: "city",
    productsRecomend: "productsRecomend",
  },
};
export const recomendValue = {
  click: 1,
  cart: 1,
  wishlist: 1,
  buy: 1,
};
