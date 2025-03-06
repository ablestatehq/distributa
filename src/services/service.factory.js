import appwriteService from "./base/appwrite.service";

class ServiceFactory {
  constructor() {
    this.services = new Map();
  }

  getService(ServiceClass) {
    if (!this.services.has(ServiceClass)) {
      this.services.set(ServiceClass, new ServiceClass(appwriteService));
    }
    return this.services.get(ServiceClass);
  }
}

export const serviceFactory = new ServiceFactory();
