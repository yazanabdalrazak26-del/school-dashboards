

const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="px-6 py-4">
                <div className="h-4 bg-blue-gray-200 rounded w-12"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-blue-gray-200 rounded w-32"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-blue-gray-200 rounded w-40"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-blue-gray-200 rounded w-20"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-blue-gray-200 rounded w-16"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-6 bg-blue-gray-200 rounded-full w-16"></div>
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                    <div className="w-8 h-8 bg-blue-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-blue-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-blue-gray-200 rounded-lg"></div>
                </div>
            </td>
        </tr>
)

function Skeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Section</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-blue-gray-100">
                    {[...Array(5)].map((_, index) => (
                        <SkeletonRow key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Skeleton