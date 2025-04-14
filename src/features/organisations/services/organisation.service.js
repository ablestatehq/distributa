import { BaseService } from "../../../lib/appwrite/base-service";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { account } from "../../../lib/appwrite/client";
import { Permission, Role, Query } from "appwrite";

class OrganisationService extends BaseService {
  constructor() {
    super(appwriteConfig.collections.organisations, []);
  }

  async createOrganisation(payload) {
    const { $id: userId } = await account.get();
    const permissions = [
      Permission.read(Role.any()),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ];

    return this.createDocument({ ...payload, created_by: userId }, permissions);
  }

  async getOrganisationById(organisationId) {
    return this.getDocument(organisationId);
  }

  async getOrganisationByUserId(userId) {
    const queries = [Query.equal("created_by", userId)];

    let {
      documents: [organisation = null],
    } = await this.listDocuments({}, queries);

    return organisation;
  }

  async listOrganisations(filters = {}) {
    const queries = [
      ...createSearchQueries({ search: filters.search }, this.searchFields),
      ...(filters.created_by
        ? [Query.equal("createdBy", filters.created_by)]
        : []),
    ];

    return this.listDocuments(filters, queries);
  }
}

export const organisationService = new OrganisationService();
export default OrganisationService;
