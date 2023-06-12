
function HowTo() {
  return (
    <div className="py-3">
      <p className="py-2">
        This Free app will save your time. Determines how much each team member
        will get from a shareable amount.
      </p>
      <p className="font-bold mt-2 mb-4 text-lg">
        3 Simple steps
      </p>
      <div className="flex justify-between bg-[#F8F9FA]">
        <div className="p-4">
          <h4 className="text-2xl text-[#6B7280]">1. Initiate Pool</h4>
          <p className="py-1">Add amount you want to share.</p>
        </div>
        <div className="p-4 col-md-4">
          <h4 className="text-2xl text-[#6B7280]">2. Beneficiaries</h4>
          <p className="py-1">
            Enter the Name and Percentage of each person. Made a mistake? No
            worries you can edit or delete.
          </p>
        </div>
        <div className="p-4 col-md-4">
          <h4 className="text-2xl text-[#6B7280]">3. Breakdown</h4>
          <p className="py-1">See the breakdown of the amount. Click Reset to start a fresh.</p>
        </div>
      </div>
    </div>
  );
}

export default HowTo;
