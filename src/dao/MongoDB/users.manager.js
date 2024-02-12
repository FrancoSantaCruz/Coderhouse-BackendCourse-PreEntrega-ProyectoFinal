import { usersModel } from "../models/users.model.js"
import Manager from "./manager.js";

class UsersManager extends Manager {
  constructor() {
    super(usersModel, { path: "cart", populate: { path: "products.product" } });
  }

  async findByEmail(email) {
    return usersModel
      .findOne({ email })
      .populate({ path: "cart", populate: { path: "products.product" } });
  }
}

export const usersManager = new UsersManager();