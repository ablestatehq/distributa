import { appwrite } from "../lib/appwrite";
import {
  CURRENCY_PREFERENCES_COLLECTION_ID,
  DATABASE_ID,
} from "../data/constants";
import { Query, ID, Permission, Role } from "appwrite";

class CurrencyPreference {
  constructor() {
    this.collectionId = CURRENCY_PREFERENCES_COLLECTION_ID;
    this.databaseId = DATABASE_ID;
  }

  async updatePreferences(userId, formData) {
    try {
      const { preferredCurrency, availableCurrencies } = formData;
      await this._handlePreferredCurrency(userId, preferredCurrency);
      await this._handleAvailableCurrencies(userId, availableCurrencies);

      return {
        message: "Currency preferences updated successfully",
      };
    } catch (error) {
      console.error("Error updating currency preferences:", error);
      throw error;
    }
  }

  async getPreferences(userId) {
    try {
      const preferred = await appwrite.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal("user_id", userId), Query.equal("is_preferred", true)]
      );

      const available = await appwrite.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal("user_id", userId), Query.equal("is_available", true)]
      );

      return {
        preferredCurrency: preferred.documents[0] || null,
        availableCurrencies: available.documents,
      };
    } catch (error) {
      console.error("Error fetching currency preferences:", error);
      throw error;
    }
  }

  _sanitizeCurrencyData(data) {
    const appwriteAttributes = [
      "$id",
      "$createdAt",
      "$updatedAt",
      "$permissions",
      "$databaseId",
      "$collectionId",
    ];

    return Object.fromEntries(
      Object.entries(data).filter(([key]) => !appwriteAttributes.includes(key))
    );
  }

  async _handlePreferredCurrency(userId, preferredCurrency) {
    try {
      const existing = await appwrite.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal("user_id", userId), Query.equal("is_preferred", true)]
      );

      const sanitizedData = this._sanitizeCurrencyData(preferredCurrency);

      if (existing.total === 0) {
        await appwrite.databases.createDocument(
          this.databaseId,
          this.collectionId,
          ID.unique(),
          {
            user_id: userId,
            is_preferred: true,
            is_available: false,
            ...sanitizedData,
          },
          [
            Permission.read(Role.any()),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
          ]
        );
      } else {
        await appwrite.databases.updateDocument(
          this.databaseId,
          this.collectionId,
          existing.documents[0].$id,
          {
            ...sanitizedData,
          }
        );
      }
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 2));
      throw error;
    }
  }

  async _handleAvailableCurrencies(userId, availableCurrencies) {
    const current = await appwrite.databases.listDocuments(
      this.databaseId,
      this.collectionId,
      [Query.equal("user_id", userId), Query.equal("is_available", true)]
    );

    const currentCodes = new Set(current.documents.map(({ code }) => code));
    const newCodes = new Set(availableCurrencies.map(({ code }) => code));

    const toAdd = availableCurrencies.filter(
      ({ code }) => !currentCodes.has(code)
    );
    const toRemove = current.documents.filter(
      ({ code }) => !newCodes.has(code)
    );
    const toUpdate = current.documents.filter(({ code }) => newCodes.has(code));

    await this._removeAvailableCurrencies(toRemove);
    await this._addAvailableCurrencies(userId, toAdd);
    await this._updateAvailableCurrencies(current.documents, toUpdate);
  }

  async _removeAvailableCurrencies(currencies) {
    for (const currency of currencies) {
      await appwrite.databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        currency.$id
      );
    }
  }

  async _addAvailableCurrencies(userId, currencies) {
    for (const currency of currencies) {
      const sanitizedCurrencyData = this._sanitizeCurrencyData(currency);

      await appwrite.databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        {
          user_id: userId,
          is_preferred: false,
          is_available: true,
          ...sanitizedCurrencyData,
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
    }
  }

  async _updateAvailableCurrencies(existingDocs, currencies) {
    for (const currency of currencies) {
      const existingDoc = existingDocs.find(
        (doc) => doc.code === currency.code
      );
      if (existingDoc) {
        const sanitizedCurrencyData = this._sanitizeCurrencyData(currency);
        await appwrite.databases.updateDocument(
          this.databaseId,
          this.collectionId,
          existingDoc.$id,
          {
            ...sanitizedCurrencyData,
            is_preferred: false,
            is_available: true,
          }
        );
      }
    }
  }
}

const CurrencyPreferenceService = new CurrencyPreference();
export default CurrencyPreferenceService;
