import { Type } from "typescript";
import { ControllerBase } from "../base/controller-base";
import {
  DataRecomendModel,
  IDataRecomend,
} from "../model/dataset/DataRecomend";
import { Types } from "mongoose";

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
  async pearson_correlation(user1st: string, user2st: string, value: any) {
    let existp1p2: any[] = [];
    let p1_sum: number = 0; //tổng p1
    let p2_sum: number = 0; //tổng p2
    let p1_sq_sum: number = 0; //tổng bình phương p1
    let p2_sq_sum: number = 0; //tổng bình phương p2
    let prod_p1p2: number = 0; //tổng tích p1 p2
    let p1_cur: number = 0;
    let p2_cur: number = 0;

    var num_existence = 0;

    const person1 = await this.getUser(user1st); //Lấy data người dùng p1

    const person2 = await this.getUser(user2st);

    person1?.product.map((itemUser1st) => {
      const isTrue = person2?.product.findIndex((itemUser2st) => {
        return String(itemUser1st.productId) == String(itemUser2st.productId);
      });
      if (isTrue != -1) {
        existp1p2.push({
          productId: String(itemUser1st.productId),
          value: 1,
        });
        num_existence += 1;
      }
    });
    //số lượng dataInit giống nhau
    if (existp1p2.length == 0) {
      return 0;
    }
    // return existp1p2;
    existp1p2.map((item) => {
      const user1: any = person1?.product.find((itemUser) => {
        return String(item.productId) == String(itemUser.productId);
      });
      if (user1) {
        p1_cur = user1[value];
        p1_sum += user1[value];
        p1_sq_sum += Math.pow(user1[value], 2);
      }
      const user2: any = person2?.product.find((itemUser) => {
        return String(item.productId) == String(itemUser.productId);
      });
      if (user2) {
        p2_cur = user2[value];
        p2_sum += user2[value];
        p2_sq_sum += Math.pow(user2[value], 2);
      }
      prod_p1p2 += p1_cur * p2_cur;
    });
    console.log(prod_p1p2);
    var numerator = prod_p1p2 - (p1_sum * p2_sum) / num_existence;
    var st1 = p1_sq_sum - Math.pow(p1_sum, 2) / num_existence;
    var st2 = p2_sq_sum - Math.pow(p2_sum, 2) / num_existence;
    var denominator = Math.sqrt(st1 * st2);
    if (denominator == 0) return 0;
    else {
      var val = numerator / denominator;
      return val;
    }
  }
  async recommendation_eng(person: string, value: string) {
    const totals: any = {
      setDefault: (props: any, aValue: any) => {
        if (!props) {
          props = 0;
        }
        props += aValue;
        return { props: props, aValue: aValue };
      },
    };
    const simsum: any = {
      setDefault: function (props: string | number, aValue: any) {
        if (props) {
          props = 0;
        }
        props += aValue;
        return { props: props, aValue: aValue };
      },
    };
    const person1 = await this.getUser(String(person));

    const allUser = await this.getAlluser(person);
    allUser.map(async (user) => {
      const similar: any = this.pearson_correlation(
        person,
        String(user.userId),
        value
      );
      // if (similar <= 0) {
      //   return 0;
      // }

      const person2 = await this.getUser(String(user.userId));
      person2?.product.map((product2: any) => {
        const isExist = person1?.product.findIndex((product1) => {
          return String(product2.productId) == String(product1.productId);
        });
        if (isExist != -1) {
          totals.setDefault(
            product2?.productId[value],
            product2?.productId[value] * similar
          );
          simsum.setDefault(product2?.productId[value], similar);
        }
      });
      var rank_lst = [];
      for (var item in totals) {
        if (typeof totals[item] != "function") {
          //tính trung bình theo hệ số tương quan
          var val = totals[item] / simsum[item];
          rank_lst.push({ val: val, items: item });
        }
      }
      rank_lst.sort(function (a, b) {
        //sắp xếp theo thứ tự giảm dần
        return b.val < a.val
          ? -1
          : b.val > a.val
          ? 1
          : b.val >= a.val
          ? 0
          : NaN;
      });
      // const isExist = person2?.product.findIndex((item) => {
      //   return String(item.productId) == String(user.userId);
      // });
      // if (isExist != -1) {

      // }
    });
  }
  async getAlluser(currentUser: any) {
    const userList = await this.model.find({});
    const data = userList.filter((item) => {
      return item.userId != currentUser;
    });
    return userList;
  }
}
