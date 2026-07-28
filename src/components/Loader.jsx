const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-700 border-r-teal-700"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-teal-700">
            অনুগ্রহ করে অপেক্ষা করুন...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            তথ্য লোড হচ্ছে
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;