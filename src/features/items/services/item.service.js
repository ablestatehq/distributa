import { BaseService } from "../../../lib/appwrite/base-service";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { account, databases } from "../../../lib/appwrite/client";
import { Permission, Role, Query } from "appwrite";

class ItemService extends BaseService {
  constructor() {
    super(appwriteConfig.collections.items, ["title", "units"]);
  }

  sanitizeItem(item) {
    return {
      price: item.price,
      quantity: item.quantity,
      title: item.title,
      units: item.units,
    };
  }

  async createItem(payload) {
    const { $id: userId } = await account.get();

    const permissions = [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ];

    return this.createDocument(this.sanitizeItem(payload), permissions);
  }

  async updateItem(itemId, payload) {
    const { $id: userId } = await account.get();

    const permissions = [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ];

    return this.updateDocument(itemId, this.sanitizeItem(payload), permissions);
  }

  async deleteItem(itemId) {
    return this.deleteDocument(itemId);
  }
}

export default ItemService;
