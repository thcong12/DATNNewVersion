import { NextFunction } from "express";
import { Schema } from "mongoose";

export enum OptionMiddleware {
  aggregate,
  count,
  countDocuments,
  deleteOne,
  deleteMany,
  estimatedDocumentCount,
  find,
  findOne,
  findOneAndDelete,
  findOneAndRemove,
  findOneAndReplace,
  findOneAndUpdate,
  init,
  insertMany,
  remove,
  replaceOne,
  save,
  update,
  updateOne,
  updateMany,
  validate,
}
export function addOptionMiddleware<T>(
  enumValue: any,
  value: any
): void | undefined {
  const keys = Object.keys(enumValue) as (keyof T)[];
  const key = keys.find((k) => enumValue[k] === value);

  //   schema.pre(optionString, async (next) => {

  //   });
}
