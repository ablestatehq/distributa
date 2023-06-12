function HowTo() {
  return (
    <div className="py-3 w-screen">
      <div className="xs:mx-5 sm:mx-10 md:mx-20 rounded-sm">
        <p className="py-2 mx-2">
          This Free app will save your time. Determines how much each team
          member will get from a shareable amount.
        </p>
        <p className="font-bold mt-2 mb-4 text-md mx-2">3 Simple steps</p>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 xs:gap-y-2">
          <div className="px-6 py-6 bg-[#F8F9FA] md:rounded-none sm:rounded-md xs:rounded-sm mb-2">
            <h4 className="text-xl text-[#6B7280] font-semibold">
              1. Initiate Pool
            </h4>
            <p className="py-1 text-md text-[#212529]">
              Add amount you want to share.
            </p>
          </div>
          <div className="px-6 py-6 bg-[#F8F9FA] md:rounded-none sm:rounded-md xs:rounded-sm mb-2">
            <h4 className="text-xl text-[#6B7280] font-semibold">
              2. Beneficiaries
            </h4>
            <p className="py-1 text-md text-[#212529]">
              Enter the Name and Percentage of each person. Made a mistake? No
              worries you can edit or delete.
            </p>
          </div>
          <div className="px-6 py-6 bg-[#F8F9FA] md:rounded-none sm:rounded-md xs:rounded-sm mb-2">
            <h4 className="text-xl text-[#6B7280] font-semibold">
              3. Breakdown
            </h4>
            <p className="py-1 text-md text-[#212529]">
              See the breakdown of the amount. Click Reset to start a fresh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowTo;
