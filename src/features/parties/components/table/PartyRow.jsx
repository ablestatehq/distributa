import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, useFetcher } from "react-router-dom";
import { Delete, Edit } from "../../../../components/common/icons";
import { EditParty, PartyDetails } from "../../../../components/Modals";

const PartyRow = React.memo(({ partyData, index }) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const [editModal, setEditModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);

  const toggleEditModal = () => setEditModal((edit) => !edit);
  const toggleDetailsModal = () => setDetailsModal((details) => !details);

  const [party, setParty] = useState(partyData);

  useEffect(() => {
    if (
      fetcher &&
      fetcher.data?.success &&
      fetcher?.data?.data?.$id === partyData.$id
    ) {
      setParty((party) => ({ ...party, ...fetcher.data?.data }));
    }
  }, [fetcher.data]);

  return (
    <Fragment key={party?.$id}>
      <tr
        className={`cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-grey"}`}
        onClick={toggleDetailsModal}
      >
        <td className="w-auto min-w-[5.2rem] font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start">
          {party?.name}
        </td>
        <td className="w-auto min-w-[5.2rem] font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start">
          {party?.address}
        </td>
        <td className="w-auto font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start flex gap-x-2">
          <button
            type="button"
            className="font-satoshi font-normal underline text-black leading-100 tracking-normal capitalize text-tiny"
            onClick={(event) => {
              event.stopPropagation();
              toggleEditModal();
            }}
          >
            <Edit />
          </button>
          <button
            type="button"
            className="group font-satoshi font-normal underline text-error leading-100 tracking-normal capitalize text-tiny outline-none"
            onClick={async (event) => {
              event.stopPropagation();
              console.log("Let's invoke the deleting action here");
            }}
          >
            <Delete />
          </button>
        </td>
      </tr>

      {detailsModal && (
        <PartyDetails handleClose={toggleDetailsModal} party={party} />
      )}
      {editModal && <EditParty handleClose={toggleEditModal} party={party} />}
    </Fragment>
  );
});

export default PartyRow;
