import { FaSchool } from 'react-icons/fa';

function SchoolCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-blue-gray-100 p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-blue-gray-100">
              <FaSchool className="text-blue-gray-300 text-xl" />
            </div>
            <div>
              <div className="h-6 w-32 bg-blue-gray-200 rounded-lg"></div>
              <div className="h-4 w-20 bg-blue-gray-200 rounded-lg mt-1"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-blue-gray-200 rounded"></div>
              <div>
                <div className="h-5 w-8 bg-blue-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-blue-gray-200 rounded mt-1"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-blue-gray-200 rounded"></div>
              <div>
                <div className="h-5 w-8 bg-blue-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-blue-gray-200 rounded mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolCardSkeleton;