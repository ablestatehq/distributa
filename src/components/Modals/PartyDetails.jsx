import React from "react";
import { createPortal } from "react-dom";
import { CircleX } from "../common/icons";
import { format } from "date-fns";

const PartyDetails = ({ handleClose, party }) => {
  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-full lg:w-96 h-fit max-h-full overflow-y-auto flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Party Details
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <div className="p-4 flex flex-col gap-y-4">
          <h6 className="font-archivo font-normal text-tiny leading-150 tracking-normal">
            {format(party.$createdAt, "MMMM d")}
          </h6>

          <h4 className="font-archivo font-normal text-medium leading-140 tracking-normal text-start">
            {party.name}
          </h4>

          <p className="font-satoshi font-normal text-small leading-150 tracking-normal">
            {party.address}
          </p>
          <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
            <span className="font-satoshi font-normal text-small leading-100 tracking-0">
              type
            </span>
            <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
              {party.type}
            </span>
          </div>
          <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
            <span className="font-satoshi font-normal text-small leading-100 tracking-0">
              Peferred Currency
            </span>
            <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
              {party.preferred_currency || "N/A"}
            </span>
          </div>
          <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
            <span className="font-satoshi font-normal text-small leading-100 tracking-0">
              Phone
            </span>
            <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
              {party?.phone || "N/A"}
            </span>
          </div>

          <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
            <span className="font-satoshi font-normal text-small leading-100 tracking-0">
              Email
            </span>
            <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 lowercase">
              {party?.email || "N/A"}
            </span>
          </div>
        </div>

        {/* TODO: An AB test when this is on and when this is off */}
        {/* <footer className="grid grid-cols-2 gap-4 p-4">
          <button
            className="py-3 text-error border border-solid border-error text-center font-satoshi font-bold text-small leading-100 tracking-normal"
            type="button"
          >
            Delete
          </button>
          <button
            type="button"
            className="py-3 text-accent border border-solid border-accent text-center font-satoshi font-bold text-small leading-100 tracking-normal"
          >
            Edit
          </button>
        </footer> */}
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default PartyDetails;
