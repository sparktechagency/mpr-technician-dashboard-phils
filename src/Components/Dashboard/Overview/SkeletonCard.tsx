const SkeletonCard = () => {
  return (
    <div
      className="flex rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-7"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="w-full flex flex-col animate-pulse">
        {/* Title + Icon */}
        <div className="flex items-start justify-between gap-2">
          <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
          <div className="h-10 w-10 bg-gray-300 rounded-xl"></div>
        </div>

        {/* Count */}
        <div className="mt-4 h-8 w-28 bg-gray-300 rounded-md"></div>

        {/* Trend + Percent */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-10 bg-gray-300 rounded-md"></div>
          </div>
          <div className="h-5 w-32 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonCard;
