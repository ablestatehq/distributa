import { Suspense, useState, useCallback, useEffect } from "react";
import { Button } from "../../components/common/forms";
import { Warning } from "../../components/common/icons";
import { CreateParty } from "../../components/Modals";
import { useLoaderData, Await } from "react-router-dom";
import { UserPlus } from "../../components/common/icons";
import { DATABASE_ID, PARTIES_COLLECTION_ID } from "../../data/constants";
import { appwrite } from "../../lib/appwrite";

const PartiesSettings = () => {
  const [createParty, setCreateParty] = useState(false);

  const data = useLoaderData();
  const toggleCreateParty = () => setCreateParty((createParty) => !createParty);

  return (
    <main className="flex min-h-full h-full w-full flex-col">
      <header className="mb-6">
        <h2 className="font-archivo font-normal text-lg lg:text-xl leading-110 tracking-normal pt-4 pb-2">
          Parties
        </h2>
        <div className="p-4 rounded-lg border border-accent-200 bg-accent-50 align-middle">
          <Warning className="float-left mr-1" />
          <p className="font-satoshi text-tiny leading-150 tracking-normal text-accent-800">
            Parties represent organizations and individuals involved in your
            transactions as payers or payees. They will appear in invoices,
            receipts, and transaction records. All parties must have valid
            contact information.
          </p>
        </div>
      </header>
      <div className="flex justify-end items-center mb-4">
        <Button
          type="button"
          className="w-fit px-6 py-3 font-bold text-small"
          onClick={toggleCreateParty}
        >
          Create Party
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="flex h-full flex-col gap-y-4 border border-red-500">
            Loading
          </div>
        }
      >
        <Await resolve={data?.parties}>
          {(data) => (
            <PartyContent
              toggleCreateParty={toggleCreateParty}
              documents={data.documents}
              total={data.total}
            />
          )}
        </Await>
      </Suspense>
      {createParty && <CreateParty handleClose={toggleCreateParty} />}
    </main>
  );
};

function PartyContent({ total, documents, toggleCreateParty }) {
  const [parties, setParties] = useState(documents);

  const handleCreate = useCallback(
    (party) => setParties((parties) => [party, ...parties]),
    []
  );

  const handleUpdate = useCallback((updatedParty) => {
    setParties((parties) =>
      parties.map((party) => {
        if (party.$id === updatedParty.$id) {
          return updatedParty;
        }
        return party;
      })
    );
  }, []);

  const handleDelete = useCallback((partyId) => {
    setParties((parties) => parties.filter((party) => party.$id !== partyId));
  }, []);

  useEffect(() => {
    const unsubscribe = appwrite.client.subscribe(
      `databases.${DATABASE_ID}.collections.${PARTIES_COLLECTION_ID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          handleCreate(response.payload);
        } else if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          handleUpdate(response.payload);
        } else if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          handleDelete(response.payload.$id);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return total > 0 ? (
    <div>Map the Parties</div>
  ) : (
    <PartiesEmptyState createParty={toggleCreateParty} />
  );
}

function PartiesEmptyState({ createParty }) {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <article className="flex flex-col items-center gap-y-4 w-full max-w-md">
        <div className="flex justify-center items-center rounded-full bg-grey w-24 h-24">
          <UserPlus variation="black" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="font-archivo font-normal text-xl leading-120 tracking-normal text-center"></h3>
          <p className="font-satoshi font-normal text-medium leading-150 tracking-normal text-center">
            You haven't created any party yet
          </p>
        </div>
        <Button
          className="w-fit px-12 py-3 font-bold text-medium"
          onClick={createParty}
        >
          Create New Party
        </Button>
      </article>
    </section>
  );
}

export default PartiesSettings;
