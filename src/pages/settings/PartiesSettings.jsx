import { Suspense, useState, useCallback, useEffect } from "react";
import { Button } from "../../components/common/forms";
import { Warning } from "../../components/common/icons";
import { CreateParty } from "../../components/Modals";
import {
  useLoaderData,
  Await,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserPlus } from "../../components/common/icons";
import { DATABASE_ID, PARTIES_COLLECTION_ID } from "../../data/constants";
import { appwrite } from "../../lib/appwrite";
import PartyRow from "../../features/parties/components/table/PartyRow";

const PartiesSettings = () => {
  const data = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  const [createParty, setCreateParty] = useState(false);
  const [newPartyInfo, setNewPartyInfo] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const returnToTransaction = searchParams.get("return_to_transaction");
    if (returnToTransaction === "true") setCreateParty(() => true);
  }, [location]);

  useEffect(() => {
    if (
      newPartyInfo &&
      location.search.includes("return_to_transaction=true")
    ) {
      const { id, name } = newPartyInfo;

      navigate(
        `/transactions?party_id=${id}&party_name=${encodeURIComponent(
          name
        )}&return_from_parties=true`,
        { replace: true }
      );

      setNewPartyInfo(null);
    }
  }, [newPartyInfo, location.search, navigate]);

  const toggleCreateParty = () => setCreateParty((createParty) => !createParty);

  const handlePartyCreated = (partyId, partyName) => {
    console.log("Party created:", partyId, partyName);
    setNewPartyInfo({
      id: partyId,
      name: partyName,
    });
    toggleCreateParty();
  };

  return (
    <main className="flex min-h-full h-full w-full flex-col">
      <header className="mb-6">
        <h2 className="font-archivo font-normal text-lg lg:text-xl leading-110 tracking-normal pt-4 pb-2">
          Parties
        </h2>
        <div className="p-4 rounded-lg border border-accent-200 bg-accent-50 align-middle">
          <Warning className="float-left mr-1" />
          <p className="font-satoshi text-tiny leading-150 tracking-normal text-accent-800">
            Parties represent individuals or groups involved in your
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
      <Suspense fallback={<PartiesListSkeleton />}>
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
      {createParty && (
        <CreateParty
          handleClose={toggleCreateParty}
          onPartyCreated={handlePartyCreated}
          isFromTransaction={location.search.includes(
            "return_to_transaction=true"
          )}
        />
      )}
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
    <PartiesList data={parties} />
  ) : (
    <PartiesEmptyState createParty={toggleCreateParty} />
  );
}

const PartiesList = ({ data }) => {
  return (
    <div className="h-full w-full overflow-x-auto">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="border-b border-b-greyborder">
            <th className="w-auto min-w-[5.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              Name
            </th>
            <th className="w-auto min-w-[5.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              Address
            </th>
            <th className="w-auto font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((party, index) => (
            <PartyRow key={party?.$id} partyData={party} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PartiesListSkeleton = () => {
  const loadingRows = Array(5).fill(null);

  return (
    <div className="h-full w-full overflow-x-auto">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="border-b border-b-grey">
            <th className="w-auto min-w-[5.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-auto min-w-[5.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-auto font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {loadingRows.map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded animate-pulse w-32"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded animate-pulse w-48"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="flex gap-2">
                  <div className="h-4 w-4 bg-grey rounded-sm animate-pulse"></div>
                  <div className="h-4 w-4 bg-grey rounded-sm animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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
