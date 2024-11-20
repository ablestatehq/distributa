import { useState } from "react";
import EditTransaction from "../modals/EditTransaction";
import { TransactionDetails } from "../../../../components/Modals";
import { Edit, Delete } from "../../../../components/common/icons";

const TransactionRow = ({ transaction }) => {
  const [editModal, setEditModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);

  const toggleEditModal = () => setEditModal((edit) => !edit);
  const toggleDetailsModal = () => setDetailsModal((del) => !del);

  const prefix = transaction?.flow_type === "income" ? "+" : "-";

  return (
    <tr key={transaction.$id} className="border-b border-b-greyborder">
      <td className="w-full pr-6 pt-4 pb-2 font-satoshi font-normal text-tiny leading-120 tracking-normal align-bottom">
        {transaction.item}
      </td>
      <td className="pr-6 pt-4 pb-2 font-satoshi font-normal text-tiny leading-120 tracking-normal align-bottom">
        {prefix}
        {transaction.amount}
      </td>
      <td className="pt-4 pb-2 font-satoshi font-normal text-tiny leading-100 tracking-normal">
        <div className="flex gap-2">
          <button
            className="underline outline-none"
            onClick={toggleEditModal}
          >
            <Edit />
          </button>
          <button
            className="outline-none group"
            onClick={() => console.log("Delete the things here")}
            disabled
          >
            <Delete />
          </button>
          <button
            className="underline min-w-[58px] outline-none"
            onClick={toggleDetailsModal}
          >
            See Details
          </button>
        </div>
      </td>
      {editModal && (
        <EditTransaction
          transaction={transaction}
          handleClose={() => toggleEditModal()}
        />
      )}
      {detailsModal && (
        <TransactionDetails
          transaction={transaction}
          handleClose={() => toggleDetailsModal()}
        />
      )}
    </tr>
  );
};

export default TransactionRow;
