import AppwriteService from "./appwrite";
import { ID, Permission, Role, Query } from "appwrite";

class ShareService extends AppwriteService {
  #databaseId;
  #shareInvoiceLinksCollectionId;

  constructor() {
    super();

    this.#databaseId = this.getVariables().DATABASE_ID;
    this.#shareInvoiceLinksCollectionId =
      this.getVariables().SHARED_INVOICES_COLLECTION_ID;
  }

  /**
   * Generate and create a new share link
   */
  async generateShareLink(invoiceId, options = {}) {
    const userId = (await this.account.get())?.$id ?? null;
    try {
      const DocumentId = ID.unique();

      const share_url = `${window.location.origin}/invoice/shared/${DocumentId}`;

      const shareDoc = await this.database.createDocument(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        DocumentId,
        {
          share_id: DocumentId,
          invoice_id: invoiceId,
          owner_id: userId,
          is_active: true,
          created_at: new Date().toISOString(),
          expires_at: options.expires_at || null,
          access_code: options.access_code || null,
          access_count: 0,
          last_accessed: null,
          share_type: options.share_type || "link",
          access_level: options.access_level || "view",
          recipient_email: options.recipient_email || null,
          share_url: share_url,
          notes: options.notes || null,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      return shareDoc;
    } catch (error) {
      throw new Error(`Failed to generate share link: ${error.message}`);
    }
  }

  /**
   * Get shared invoice with validation
   */
  async getSharedInvoice(shareId, accessCode = null) {
    try {
      // Query for share document
      const shareLink = await this.database.getDocument(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        shareId,
        [Query.equal("is_active", true)]
      );

      // Validate share
      await this.validateShare(shareLink, accessCode);

      // Execute the function to get the shared document.

      return;
    } catch (error) {
      throw new Error(`Failed to retrieve shared invoice: ${error.message}`);
    }
  }

  /**
   * Validate share access
   */
  async validateShare(share, accessCode = null) {
    // Check expiration
    if (share.expires_at && new Date() > new Date(share.expires_at)) {
      await this.deactivateShare(share.$id);
      throw new Error("Share link has expired");
    }

    // Verify access code if required
    if (share.access_code && share.access_code !== accessCode) {
      throw new Error("Invalid access code");
    }

    return true;
  }

  /**
   * Update share access statistics
   */
  async updateShareAccess(shareId) {
    try {
      const shareInvoiceLink = await this.database.getDocument(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        shareId
      );

      await this.database.updateDocument(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        shareInvoiceLink?.$id,
        {
          last_accessed: new Date().toISOString(),
          access_count: shareInvoiceLink.access_count + 1,
        }
      );
    } catch (error) {
      console.error("Failed to update access statistics:", error);
    }
  }

  /**
   * Deactivate a share
   */
  async deactivateShare(shareId) {
    try {
      await this.database.updateDocument(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        shareId,
        {
          is_active: false,
          deactivated_at: new Date().toISOString(),
        }
      );
    } catch (error) {
      throw new Error(`Failed to deactivate share: ${error.message}`);
    }
  }

  /**
   * List active shares for an invoice
   */
  async listInvoiceShares(invoiceId) {
    try {
      const shares = await this.database.listDocuments(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        [
          Query.equal("invoice_id", invoiceId),
          Query.equal("is_active", true),
          Query.orderDesc("$createdAt"),
        ]
      );

      return shares.documents;
    } catch (error) {
      throw new Error(`Failed to list invoice shares: ${error.message}`);
    }
  }

  /**
   * List shares created by a user
   */
  async listUserShares(userId) {
    try {
      const shares = await this.database.listDocuments(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        [
          Query.equal("owner_id", userId),
          Query.equal("is_active", true),
          Query.orderDesc("$created_at"),
        ]
      );

      return shares.documents;
    } catch (error) {
      throw new Error(`Failed to list user shares: ${error.message}`);
    }
  }

  /**
   * Revoke multiple shares
   */
  async revokeShares(shareIds) {
    try {
      const promises = shareIds.map((shareId) => this.deactivateShare(shareId));
      await Promise.all(promises);
      return true;
    } catch (error) {
      throw new Error(`Failed to revoke shares: ${error.message}`);
    }
  }

  /**
   * Update share settings
   */
  async updateShareSettings(shareId, settings) {
    try {
      const allowedUpdates = {
        expires_at: settings.expiresAt,
        access_code: settings.accessCode,
        access_level: settings.accessLevel,
        notes: settings.notes,
      };

      // Remove undefined values
      Object.keys(allowedUpdates).forEach(
        (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key]
      );

      const updated = await this.database.updateDocument(
        this.#databaseId,
        this.#shareInvoiceLinksCollectionId,
        shareId,
        allowedUpdates
      );

      return updated;
    } catch (error) {
      throw new Error(`Failed to update share settings: ${error.message}`);
    }
  }
}
