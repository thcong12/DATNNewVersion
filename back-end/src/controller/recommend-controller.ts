import { Model } from "mongoose";
import { ControllerBase } from "../base/controller-base";
import {
  DataRecomendNewModel,
  IDataRecomendNew,
} from "../model/dataset/DataRecomendModel";
import { ILibraly, LibralyModel } from "../model/user/LibraryModel";

export interface IValue {
  key: string;
  value: number;
}
export class DataRecomendController extends ControllerBase<IDataRecomendNew> {
  private LibraryModel: Model<ILibraly> = LibralyModel;

  private recomendValue = {
    click: 1,
    cart: 4,
    wishlist: 5,
    buy: 10,
  };
  constructor() {
    super(DataRecomendNewModel);
  }
  findSimilarValue(
    arrayValue: IDataRecomendNew[],
    value: IDataRecomendNew,
    key: keyof IDataRecomendNew
  ) {
    const isExist = arrayValue.findIndex((item: any) => {
      return String(value[key]) == String(item[key]);
    });
    if (isExist != -1) {
      return true;
    } else {
      return false;
    }
  }

  async getUser(id: string) {
    const userData = await this.model.find({
      userId: id,
    });
    if (userData) {
      return userData;
    } else {
      const newData = await this.model.create({
        userId: id,
      });
      return newData;
    }
  }

  async getAlluser(currentUser: any) {
    const userList = await this.model.aggregate([
      {
        $group: {
          _id: "$userId",
        },
      },
    ]);
    const data = userList.filter((item) => {
      return String(item._id) != currentUser;
    });
    return data;
  }

  async getAllProduct(currentProduct: any) {
    const userList = await this.model.aggregate([
      {
        $group: {
          _id: "$productId",
        },
      },
    ]);
    const data = userList.filter((item) => {
      return String(item._id) != currentProduct;
    });
    return data;
  }
  caculateValue(userstProductItem: IDataRecomendNew) {
    return (
      userstProductItem.click +
      (this.recomendValue.cart * userstProductItem.cart -
        (this.recomendValue.cart / 2) * (userstProductItem.cart - 1)) +
      (this.recomendValue.wishlist * userstProductItem.wishlist -
        (this.recomendValue.wishlist / 2) * (userstProductItem.wishlist - 1)) +
      this.recomendValue.buy
    );
  }
  pearson_correlation(
    arrayValue1: IDataRecomendNew[],
    arrayValue2: IDataRecomendNew[],
    key: keyof IDataRecomendNew
  ) {
    let existp1p2: string[] = [];
    let p1_sum = 0.0; //tổng p1
    let p2_sum = 0.0; //tổng p2
    let p1_sq_sum = 0.0; //tổng bình phương p1
    let p2_sq_sum = 0.0; //tổng bình phương p2
    let prod_p1p2 = 0.0; //tổng tích p1 p2
    let numerator = 0.0;
    let denominator = 0.0;
    let denominator1 = 0.0;
    let denominator2 = 0.0;

    const averageArrayValue1 = this.caculateAverage(arrayValue1);
    const averageArrayValue2 = this.caculateAverage(arrayValue2);
    for (let i = 0; i < arrayValue1.length; i++) {
      const isExist = existp1p2.findIndex((item) => {
        return String(arrayValue1[i][key]) == String(item);
      });
      // const isExist = this.findSimilarValue(arrayValue2, arrayValue1[i], key);
      if (isExist == -1 && this.caculateValue(arrayValue1[i]) > 3) {
        existp1p2.push(String(arrayValue1[i][key]));
      }
    }
    for (let i = 0; i < arrayValue2.length; i++) {
      const isExist = existp1p2.findIndex((item) => {
        return String(arrayValue2[i][key]) == String(item);
      });
      // const isExist = this.findSimilarValue(arrayValue2, arrayValue1[i], key);
      if (isExist == -1 && this.caculateValue(arrayValue2[i]) > 3) {
        existp1p2.push(String(arrayValue2[i][key]));
      }
    }

    for (let i = 0; i < existp1p2.length; i++) {
      let p1_cur = 0.0;
      let p2_cur = 0.0;
      const user1 = arrayValue1.findIndex((itemUser: IDataRecomendNew) => {
        return String(existp1p2[i]) == String(itemUser[key]);
      });
      if (user1 != -1) {
        p1_cur = this.caculateValue(arrayValue1[user1]) - averageArrayValue1;
        p1_sum = p1_sum + p1_cur;
        p1_sq_sum = p1_sq_sum + Math.pow(p1_cur, 2);
      }

      const user2 = arrayValue2.findIndex((itemUser: IDataRecomendNew) => {
        return String(existp1p2[i]) == String(itemUser[key]);
      });
      if (user2 != -1) {
        p2_cur = this.caculateValue(arrayValue2[user2]) - averageArrayValue2;
        p2_sum = p2_sum + p2_cur;
        p2_sq_sum = p2_sq_sum + Math.pow(p2_cur, 2);
      }
      prod_p1p2 = prod_p1p2 + p1_cur * p2_cur;
    }

    // numerator = prod_p1p2;
    numerator = existp1p2.length * prod_p1p2 - p2_sum * p1_sum;
    // prod_p1p2 -
    // (p1_sum * averageValue2 + p2_sum * averageValue1) +
    // existp1p2.length * averageValue1 * averageValue2;

    // denominator1 = p1_sq_sum;
    denominator1 = existp1p2.length * p1_sq_sum - Math.pow(p1_sum, 2);
    // existp1p2.length * Math.pow(averageValue1, 2) -
    // 2 * averageValue1 * p1_sum;

    // denominator2 = p2_sq_sum;
    denominator2 = existp1p2.length * p2_sq_sum - Math.pow(p2_sum, 2);
    // p2_sq_sum +
    // existp1p2.length * Math.pow(averageValue2, 2) -
    // 2 * averageValue2 * p2_sum;
    // console.log({ denominator2: Math.sqrt(denominator2) });
    denominator = Math.sqrt(denominator1) * Math.sqrt(denominator2);

    if (denominator == 0) return 0;
    else {
      let val = 0.0;
      val = numerator / denominator;
      return val;
    }
  }
  async recommendation_eng(valueGet: any, key: keyof IDataRecomendNew) {
    var rank_lst: any = [];
    let array1: IValue[] = [];
    var array2: IValue[] = [];
    let total = 0;
    let allValueKey = [];
    let valueArray1: IDataRecomendNew[] = [];
    let valueArray2: IDataRecomendNew[] = [];

    if (key == "productId") {
      valueArray1 = await this.model.find({
        userId: valueGet,
      });
      allValueKey = await this.getAlluser(valueGet);
    } else if (key == "userId") {
      valueArray1 = await this.model.find({
        productId: valueGet,
      });
      allValueKey = await this.getAllProduct(valueGet);
    }
    console.log("-----------------------------------------------------");

    console.log(
      "item                    ",
      "|",
      "value                   ",
      "|"
    );
    console.log("-----------------------------------------------------");

    const averageArrayValue1 = this.caculateAverage(valueArray1);

    for (let i = 0; i < valueArray1.length; i++) {
      console.log(
        this.printResult(valueArray1[i].productId, 25),
        this.printResult(this.caculateValue(valueArray1[i]), 25)
      );
    }

    console.log("-----------------------------------------------------");
    console.log(
      "user                    ",
      "|",
      "similar                 ",
      "|"
    );
    console.log("-----------------------------------------------------");

    for (let i = 0; i < allValueKey.length; i++) {
      if (key == "productId") {
        valueArray2 = await this.model.find({
          userId: allValueKey[i]._id,
        });
      } else if (key == "userId") {
        valueArray2 = await this.model.find({
          productId: allValueKey[i]._id,
        });
      }
      // const averageArray2 = this.caculateAverage(valueArray2);
      const similar: any = this.pearson_correlation(
        valueArray1,
        valueArray2,
        key
      );

      console.log(
        this.printResult(allValueKey[i]._id, 25),
        this.printResult(similar, 25)
        // this.printResult(averageArray2, 25)
      );
      if (similar != 0) {
        const averageArrayValue2 = this.caculateAverage(valueArray2);
        valueArray2?.map((itemValue2) => {
          const isExistValue = valueArray1?.findIndex((itemValue1) => {
            return String(itemValue2[key]) == String(itemValue1[key]);
          });
          if (isExistValue == -1) {
            const qwe1 = this.caculate(
              similar * this.caculateValue(itemValue2),
              // - averageArray2
              itemValue2[key]
            );

            const qwe2 = this.caculate(Math.abs(similar), itemValue2[key]);
            const isExist1 = array1.findIndex((item: IValue) => {
              return String(item.key) == String(itemValue2[key]);
            });
            if (isExist1 == -1) {
              array1.push(qwe1 as IValue);
            } else {
              array1[isExist1].value = array1[isExist1].value + qwe1.value;
            }

            const isExist2 = array2.findIndex((item: IValue) => {
              return String(item.key) == String(itemValue2[key]);
            });
            if (isExist2 == -1) {
              array2.push(qwe2 as IValue);
            } else {
              array2[isExist2].value = array2[isExist2].value + qwe2.value;
            }
          }
        });
      }
    }
    console.log(
      "-----------------------------------------------------------------------------------------------------------"
    );
    console.log(
      "item                    ",
      "|",
      "average                 ",
      "|",
      "denominator             ",
      "|",
      "value                   ",
      "|"
    );
    console.log(
      "-----------------------------------------------------------------------------------------------------------"
    );
    for (let i = 0; i < array1.length; i++) {
      if (array2[i].value != 0) {
        let val = array1[i].value / Math.abs(array2[i].value);

        console.log(
          String(array1[i].key),
          "|",
          this.printResult(array1[i].value, 25),

          this.printResult(Math.abs(array2[i].value), 25),

          this.printResult(val, 25)
        );
        val = val;
        if (val > 4) {
          rank_lst.push({ val: val, key: array1[i].key });
        }
      }
    }

    valueArray1.map((item) => {
      if (this.caculateValue(item) > 3 && item.buy == 0) {
        rank_lst.push({
          val: this.caculateValue(item),
          key: item[key],
        });
      }
    });
    rank_lst.sort((a: any, b: any) => {
      return b.val - a.val;
    });
    console.log(
      "-----------------------------------------------------------------------------------------------------------"
    );

    console.log(
      "item                    ",
      "|",
      "value                   ",
      "|"
    );
    console.log("-----------------------------------------------------");
    rank_lst.map((item: any) => {
      console.log(
        this.printResult(item.key, 25),
        this.printResult(item.val, 25)
      );
    });
    console.log("-----------------------------------------------------");
    return rank_lst;
  }
  caculateAverage(array: any[]) {
    const arrayLength = array.length;
    let total = 0;
    for (let i = 0; i < arrayLength; i++) {
      total = total + this.caculateValue(array[i]);
      // console.log(
      //   this.printResult(array[i].productId, 25),
      //   this.printResult(this.caculateValue(array[i]), 25)
      // );
    }
    return total / arrayLength;
  }
  caculate(value: number, key: any) {
    let record: IValue = {
      key: "",
      value: 0,
    };
    record.key = key;
    record.value = value;
    return record;
  }
  async checkIsBuy(data: IValue[], userId: any) {
    let newdata: any = [];
    const userLibarary = await this.LibraryModel.findOne({ userId: userId });

    if (!userLibarary) {
      await this.LibraryModel.create({
        userId: userId,
      });
      return newdata;
    } else {
      data.map((item) => {
        const isExist = userLibarary?.userProduct.findIndex((product) => {
          return String(product.product) == String(item.key);
        });
        if (isExist == -1) {
          newdata.push(item.key);
        }
      });

      return newdata;
    }
  }

  async getUserProduct(user: string, product: string) {
    const userProduct = await this.model.findOne({
      $and: [
        {
          userId: user,
        },
        {
          productId: product,
        },
      ],
    });
    if (!userProduct) {
      const newUserProduct = await this.model.create({
        userId: user,
        productId: product,
      });
      return newUserProduct;
    }
    return userProduct;
  }

  async updateData(userId: string, key: any, product: string | any) {
    if (typeof product == "string") {
      const userRecomend: any = await this.getUserProduct(userId, product);
      userRecomend[key] = userRecomend[key] + 1;
      console.log(userRecomend[key]);
      await userRecomend.save();
      console.log("data had set");
    } else {
      for (let i = 0; i < (product as any[]).length; i++) {
        const userRecomend: any = await this.getUserProduct(userId, product[i]);
        userRecomend[key] = userRecomend[key] + 1;
        console.log(userRecomend[key]);
        await userRecomend.save();
        console.log("data had set");
      }
    }
  }
  printResult(value: any, row: number) {
    const lengthValue1 = String(value).length;
    const space = " ";
    let stringPrint = "";
    for (let i = 0; i < row - lengthValue1; i++) {
      stringPrint = stringPrint + space;
    }
    return String(value) + stringPrint + "|";
  }
}
