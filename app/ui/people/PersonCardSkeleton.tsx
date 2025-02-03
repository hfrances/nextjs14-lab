
const PersonCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center space-x-4 animate-pulse">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>

        {/* Text */}
        <div>
          <div className="h-4 w-32 bg-gray-300 rounded-md mb-2"></div>
          <div className="h-3 w-48 bg-gray-300 rounded-md mb-1"></div>
          <div className="h-3 w-40 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row space-x-2">
        <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
        <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default PersonCardSkeleton;
