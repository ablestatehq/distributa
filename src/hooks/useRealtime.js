import { useEffect } from "react";
import { DATABASE_ID } from "../data/constants";
import { appwrite } from "../lib/appwrite";

const useRealtime = (collectionId, callbacks = {}) => {
  useEffect(() => {
    const unsubscribe = appwrite.client.subscribe(
      `databases.${DATABASE_ID}.collections.${collectionId}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          callbacks.onCreate?.(response.payload);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          callbacks.onUpdate?.(response.payload);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          callbacks.onDelete?.(response.payload);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [appwrite.client, collectionId, callbacks]);
};

export default useRealtime;
