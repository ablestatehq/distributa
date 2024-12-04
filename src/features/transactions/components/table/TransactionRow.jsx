import { useState } from "react";
import EditTransaction from "../modals/EditTransaction";
import { TransactionDetails } from "../../../../components/Modals";
import { Edit, Delete } from "../../../../components/common/icons";
import { appwrite } from "../../../../lib/appwrite";
import { format } from "date-fns";
import {
  DATABASE_ID,
  TRANSACTIONS_COLLECTION_ID,
  MONTHLY_STATEMENTS_COLLECTION_ID,
} from "../../../../data/constants";
import { Query } from "appwrite";

const TransactionRow = ({ transaction }) => {
  const [editModal, setEditModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);

  const toggleEditModal = () => setEditModal((edit) => !edit);
  const toggleDetailsModal = () => setDetailsModal((del) => !del);

  const prefix = transaction?.flow_type === "income" ? "+" : "-";

  const deleteTransaction = async () => {
    try {
      const yearMonth = format(new Date(transaction.date), "yyyy-MM");
      const { $id: userId } = await appwrite.account.get();
      const {
        documents: [accountSummary = null],
      } = await appwrite.databases.listDocuments(
        DATABASE_ID,
        MONTHLY_STATEMENTS_COLLECTION_ID,
        [Query.equal("year_month", yearMonth), Query.equal("user_id", userId)]
      );

      if (accountSummary) {
        let { income, expense } = accountSummary;

        if (transaction.flow_type === "income") {
          income -= transaction.amount;
        } else {
          expense -= transaction.amount;
        }

        await appwrite.databases.updateDocument(
          DATABASE_ID,
          MONTHLY_STATEMENTS_COLLECTION_ID,
          accountSummary.$id,
          {
            income: income >= 0 ? income : 0,
            expense: expense >= 0 ? expense : 0,
          }
        );
      }

      await appwrite.databases.deleteDocument(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        transaction.$id
      );

      return;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 2));
      throw error;
    }
  };

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
          <button className="underline outline-none" onClick={toggleEditModal}>
            <Edit />
          </button>
          <button className="outline-none group" onClick={deleteTransaction}>
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
