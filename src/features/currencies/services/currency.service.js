import { BaseService } from "../../../lib/appwrite/base-service";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { account } from "../../../lib/appwrite/client";
import { Permission, Role, Query } from "appwrite";

class CurrencyService extends BaseService {
  constructor() {
    super(appwriteConfig.collections.currencyPreferences, []);
  }

  async listCurrencies(filters = {}) {
    const queries = [
      ...(filters.is_available
        ? [Query.equal("is_available", filters.is_available)]
        : []),
      ...(filters.user_id ? [Query.equal("user_id", filters.user_id)] : []),
    ];
    
    return this.listDocuments(filters, queries);
  }

  async listAvailableCurrenciesByUserId(userId) {
    return this.listCurrencies({
      is_available: true,
      user_id: userId,
    });
  }
}

export const currencyService = new CurrencyService();
export default CurrencyService;
