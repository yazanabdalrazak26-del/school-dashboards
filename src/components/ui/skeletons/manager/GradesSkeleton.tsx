export const GradesSkeleton = () => {
  return (
    <>
    
    <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Grade Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Academic Year</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Sections</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Students</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-gray-100">
            {[1, 2, 3, 4, 5].map((index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-5 w-32 bg-blue-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-16 bg-blue-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 bg-blue-gray-200 rounded"></div>
                    <div className="h-5 w-8 bg-blue-gray-200 rounded"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 bg-blue-gray-200 rounded"></div>
                    <div className="h-5 w-8 bg-blue-gray-200 rounded"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <div className="h-9 w-9 bg-blue-gray-200 rounded-lg"></div>
                    <div className="h-9 w-9 bg-blue-gray-200 rounded-lg"></div>
                    <div className="h-9 w-9 bg-blue-gray-200 rounded-lg"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {[1, 2, 3].map((index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4 animate-pulse">
          <div className="h-4 w-24 bg-blue-gray-200 rounded mb-2"></div>
          <div className="h-8 w-16 bg-blue-gray-200 rounded"></div>
        </div>
      ))}
    </div>
    </>
  );
};

