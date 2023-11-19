import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";
import { type } from "os";

interface ISale {
  salePersent: Number;
  startDay: string;
  endDay: string;
}
interface IImage {
  title: string;
  url: string;
}
interface ISystemRequiment {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  directX: string;
  storage: string;
  soundCard: string;
}
interface IReview {
  title: string;
  require: boolean;
  rating: Number;
  comment: string;
  user: Types.ObjectId;
}

export interface IProduct {
  _id: Types.ObjectId;
  productName: string;
  shortDescription: string;
  price: Number;
  sale: ISale;
  horizontalImg: IImage;
  verticalImg: IImage;
  isActive: boolean;
}

export interface IProductDetail {
  productId: Types.ObjectId;
  developer: Types.ObjectId;
  description: string;
  categlory: Types.ObjectId[];
  rating: Number;
  systemrequiment: Types.DocumentArray<ISystemRequiment>;
  reviews: Types.DocumentArray<IReview>;
  imgList: Types.DocumentArray<IImage>;
}
const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      require: true,
      default: "",
    },
    shortDescription: {
      type: String,
      require: true,
      default: "",
    },
    price: {
      type: Number,
      require: true,
      default: 0.0,
    },
    sale: {
      salePersent: {
        type: Number,
        default: 0.0,
      },
      startDay: {
        type: String,
      },
      endDay: {
        type: String,
      },
    },
    horizontalImg: {
      title: {
        type: String,
        require: true,
        default: "",
      },
      url: {
        type: String,
        require: true,
        default: "",
      },
    },
    verticalImg: {
      title: {
        type: String,
        require: true,
        default: "",
      },
      url: {
        type: String,
        require: true,
        default: "",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const productDetailSchema = new Schema<IProductDetail>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    developer: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Developer",
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    categlory: [
      {
        type: Schema.Types.ObjectId,
        require: false,
        ref: "Categlory",
      },
    ],
    rating: {
      type: Number,
      require: true,
      default: 5.0,
    },
    systemrequiment: [
      {
        os: { type: String, require: true, default: "" },
        cpu: { type: String, require: true, default: "" },
        ram: { type: String, require: true, default: "" },
        gpu: { type: String, require: true, default: "" },
        directX: { type: String, require: true, default: "" },
        storage: { type: String, require: true, default: "" },
        soundCard: { type: String, require: true, default: "" },
      },
    ],
    reviews: [
      {
        title: {
          type: String,
          require: true,
          default: "",
        },
        rating: {
          type: Number,
          require: true,
          default: 0.0,
        },
        comment: {
          type: String,
          require: true,
          default: "",
        },
        user: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "User",
        },
      },
    ],
    imgList: [
      {
        title: {
          type: String,
          require: true,
          default: "",
        },
        url: {
          type: String,
          require: true,
          default: "",
        },
      },
    ],
  },
  { _id: false, timestamps: true }
);
export const ProductDetailModel: Model<IProductDetail> = mongoose.model(
  CONSTANT.MODEL_NAME.productDetail,
  productDetailSchema
);
export const ProductModel: Model<IProduct> = mongoose.model(
  CONSTANT.MODEL_NAME.product,
  productSchema
);
