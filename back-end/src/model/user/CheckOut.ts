import mongoose, { Model, Schema, Types } from "mongoose";
import { CONSTANT } from "../../constant";
import { ICity } from "./CityModel";
import { Type } from "typescript";

export interface IOrder {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  totalPrice: number;
  disCountCode: string;
  paymentMethod: string;
  address: string;
  isPaid: boolean;
  paidAt: string;
}

export interface IOrderDetail {
  orderId: Types.ObjectId;
  orderItem: IOrderItem[];
}

export interface IOrderItem {
  product: Types.ObjectId;
}
const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    disCountCode: {
      type: String,
      require: false,
      default: "",
    },
    paymentMethod: {
      type: String,
      require: true,
      default: "",
    },
    address: {
      type: String,
      require: false,
      default: "",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: String,
      require: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const orderDetailSchema = new Schema<IOrderDetail>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Order",
    },
    orderItem: [
      {
        product: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
      { _id: false },
    ],
  },
  {
    timestamps: true,
  }
);

export const OrderDetailModel: Model<IOrderDetail> = mongoose.model(
  CONSTANT.MODEL_NAME.orderDetail,
  orderDetailSchema
);

export const OrderModel: Model<IOrder> = mongoose.model(
  CONSTANT.MODEL_NAME.order,
  orderSchema
);
