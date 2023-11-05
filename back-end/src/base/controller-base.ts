import { Model } from "mongoose";
import express, { Request, Response } from "express";
export abstract class ControllerBase<T> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async getAllData(): Promise<T | any> {
    const data: T[] = await this.model.find();
    if (data) {
      return data;
    }
    return;
  }
  async getDetailById(id: string): Promise<T | any> {
    const data = await this.model.findById(id);
    if (data) {
      return data;
    }
    return;
  }
  async getDetailByVar(key: any, value: any): Promise<T | any> {
    const data = await this.model.findOne({ [key]: value });
    console.log({ [key]: value });
    if (data) {
      return data;
    }
    return;
  }
  async postData(reqData: T | any, key: any): Promise<T | undefined> {
    const cateExist = await this.getDetailByVar(key, reqData[key]);
    if (!cateExist) {
      const data: any = await this.model.create<T>({
        ...reqData,
      });
      return data;
    }
    return;
  }
  async putData(id: string, reqData: T | any): Promise<T | undefined> {
    const cateExist = await this.getDetailById(id);
    if (cateExist) {
      const data: any = await this.model.findByIdAndUpdate<T>(
        id,
        {
          $set: {
            ...reqData,
          },
        },
        {
          new: true,
        }
      );
      return data;
    }
    return;
  }

  async importData(data: T[]) {
    // await CategloryModel;
  }
}
