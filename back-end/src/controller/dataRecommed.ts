import { Model } from "mongoose";
import { ControllerBase } from "../base/controller-base";
import {
  DataRecomendModel,
  IDataRecomend,
} from "../model/dataset/DataRecomend";
import {
  DataRecomendModelRaw,
  IDataRecomendRaw,
} from "../model/dataset/DataRecommend-raws";

export class DataRecomendController extends ControllerBase<IDataRecomend> {
  private DataRecomRaw: Model<IDataRecomendRaw> = DataRecomendModelRaw;
  constructor() {
    super(DataRecomendModel);
  }
  async defineData() {
    const dataRaw = await this.DataRecomRaw.aggregate([
      {
        $addFields: {
          product: [],
        },
      },
      {
        $group: {
          _id: "$userId",
          product: { $push: { productId: "$productId", click: "$click" } },
        },
      },
    ]);
    return dataRaw;
  }
  setData(data: any[]) {
    // let newData1: IDataRecomend[];
    // let dataItem: IDataRecomend = {
    //   _id: "1",
    //   product: [],
    //   userId: "1",
    // };
    // for (let i = 0; i <= data.length; i++) {
    //   dataItem.userId = data[i]._id;
    //   dataItem.product = data[i].product;
    // }

    let newData: IDataRecomend[] = [];
    newData = data.map((item) => {
      return { userId: item._id, product: item.product };
    }) as IDataRecomend[];
    
    const dataInput = this.model.insertMany(newData);
    return dataInput;
  }
}
