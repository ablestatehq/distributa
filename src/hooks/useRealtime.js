import { useMemo, useEffect } from "react";
import { client } from "../lib/appwrite/client";
import { appwriteConfig } from "../lib/appwrite/config";

export default function useRealtime(collectionId, options = {}) {
  const handlers = useMemo(
    () => ({
      create: options?.onCreated,
      update: options?.onUpdated,
      delete: options?.onDeleted,
    }),
    [options?.onCreated, options?.onUpdated, options?.onDeleted]
  );

  useEffect(() => {
    const EVENTS = {
      CREATE: "databases.*.collections.*.documents.*.create",
      UPDATE: "databases.*.collections.*.documents.*.update",
      DELETE: "databases.*.collections.*.documents.*.delete",
    };

    // Only subscribe if there's at least one handler implemented
    if (!Object.values(handlers).some(Boolean)) {
      console.warn(
        `No realtime handlers implemented for collection: ${collectionId}`
      );
      return;
    }

    const unsubscribe = client.subscribe(
      `databases.${appwriteConfig.databaseId}.collections.${collectionId}.documents`,
      (response) => {
        if (handlers.create && response.events.includes(EVENTS.CREATE)) {
          handlers.create(response);
        }
        if (handlers.update && response.events.includes(EVENTS.UPDATE)) {
          handlers.update(response);
        }
        if (handlers.delete && response.events.includes(EVENTS.DELETE)) {
          handlers.delete(response);
        }
      }
    );

    return () => unsubscribe();
  }, [collectionId, handlers]);
}
