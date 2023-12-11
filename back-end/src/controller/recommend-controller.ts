import { Type } from "typescript";
import { ControllerBase } from "../base/controller-base";
import {
  DataRecomendModel,
  IDataRecomend,
} from "../model/dataset/DataRecomend";
import { Types } from "mongoose";
import { skip } from "node:test";

export class DataRecomendController extends ControllerBase<IDataRecomend> {
  //   private DataRecomRaw: Model<IDataRecomendRaw> = DataRecomendModelRaw;
  constructor() {
    super(DataRecomendModel);
  }
  async getUser(id: string) {
    const userData = await this.model.findOne({
      userId: id,
    });
    if (userData) {
      return userData;
    }
  }
  pearson_correlation(user1st: any, user2st: any, value: any) {
    let existp1p2: any[] = [];
    let p1_sum = 0.0; //tổng p1
    let p2_sum = 0.0; //tổng p2
    let p1_sq_sum = 0.0; //tổng bình phương p1
    let p2_sq_sum = 0.0; //tổng bình phương p2
    let prod_p1p2 = 0.0; //tổng tích p1 p2
    let numerator = 0.0;
    let st1 = 0.0;
    let st2 = 0.0;
    let denominator = 0.0;

    user1st?.product.map((itemUser1st: any) => {
      const isTrue = user2st?.product.findIndex((itemUser2st: any) => {
        return String(itemUser1st.productId) == String(itemUser2st.productId);
      });
      if (isTrue != -1) {
        existp1p2.push({
          productId: String(itemUser1st.productId),
          value: 1,
        });
      }
    });
    //số lượng dataInit giống nhau
    if (existp1p2.length == 0) {
      return 0;
    }
    console.log("is running");
    // return existp1p2;
    existp1p2.map((item) => {
      let p1_cur = 0.0;
      let p2_cur = 0.0;
      const user1: any = user1st?.product.find((itemUser: any) => {
        return String(item.productId) == String(itemUser.productId);
      });

      if (user1) {
        // console.log({ user: user1.productId, [value]: user1[value] });
        p1_cur = user1[value];
        p1_sum += user1[value];
        p1_sq_sum += Math.pow(user1[value], 2);
      }

      const user2: any = user2st?.product.find((itemUser: any) => {
        return String(item.productId) == String(itemUser.productId);
      });
      if (user2) {
        // console.log({ user: user2.productId, [value]: user2[value] });
        // count2 = count2 + 1;
        p2_cur = user2[value];
        p2_sum += user2[value];
        p2_sq_sum += Math.pow(user2[value], 2);
      }
      prod_p1p2 += p1_cur * p2_cur;
      // console.log(item);
    });
    // console.log(prod_p1p2, p1_sum, p2_sum, existp1p2.length);
    numerator = prod_p1p2 - (p1_sum * p2_sum) / existp1p2.length;
    // console.log(numerator);
    st1 = p1_sq_sum - Math.pow(p1_sum, 2) / existp1p2.length;
    st2 = p2_sq_sum - Math.pow(p2_sum, 2) / existp1p2.length;
    // console.log(st1, st2);
    denominator = Math.sqrt(st1 * st2);
    // console.log(denominator);
    if (denominator == 0) return 0;
    else {
      let val = 0.0;
      val = numerator / denominator;
      console.log(val);
      return val;
    }
  }
  async recommendation_eng(person: string, value: string) {
    var rank_lst: any = [];
    let array1: any = [];
    var array2: any = [];
    var total = 0;
    const person1 = await this.getUser(String(person));

    const allUser = await this.getAlluser(person);

    allUser.map((user) => {
      const similar: any = this.pearson_correlation(person1, user, value);
      if (similar <= 0) {
        return;
      }
      console.log("run");
      user?.product.map((product2: any) => {
        const isExist = person1?.product.findIndex((product1) => {
          return String(product2.productId) == String(product1.productId);
        });
        if (isExist == -1) {
          // total += product2[value] * similar;
          const qwe1 = this.caculate(
            product2[value] * similar,
            product2.productId
          );
          const qwe2 = this.caculate(similar, product2.productId);
          array1.push(qwe1 as any);
          array2.push(qwe2 as any);
        }
      });
      console.log("------");
      // console.log(array2)
    });
    // var rank_lst = [];
    // for (var item in totals) {
    // if (typeof totals[item] != "function") {
    //   //tính trung bình theo hệ số tương quan
    //   var val = totals[item] / simsum[item];
    //   rank_lst.push({ val: val, items: item });
    // }
    // console.log(item);
    // }
    // rank_lst.sort(function (a, b) {
    //   //sắp xếp theo thứ tự giảm dần
    //   return b.val < a.val
    //     ? -1
    //     : b.val > a.val
    //     ? 1
    //     : b.val >= a.val
    //     ? 0
    //     : NaN;
    // });
    for (let i = 0; i < array1.length; i++) {
      // console.log(array1[i]);
      // array2[i];
      let val = array1[i].value / array2[i].value;
      rank_lst.push({ val: val, item: array1[i].productId });
    }
    return rank_lst;
  }

  caculate(value: any, key: string) {
    let record: any = {};
    record.productId = key;
    record.value = value;
    return record;
  }

  async getAlluser(currentUser: any) {
    const userList = await this.model.find({});
    const data = userList.filter((item) => {
      return String(item.userId) != currentUser;
    });
    return data;
  }
}
