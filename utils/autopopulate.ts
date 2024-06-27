import { NextFunction } from "express";

// Define a middleware function for populating 'author'
export = (field:string) => async function(this: any, next: NextFunction) {
  await this.populate(field).execPopulate();
  next();
}