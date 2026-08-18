import { FaUsers } from 'react-icons/fa';

export const SectionsSkeleton = () => {
    const skeletonRows = 5;

    return (
        <div>
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-gray-200 rounded-xl animate-pulse"></div>
                        <div className="h-8 w-48 bg-blue-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-4 w-64 bg-blue-gray-200 rounded-lg mt-2 animate-pulse"></div>
                </div>
                <div className="h-11 w-36 bg-blue-gray-200 rounded-xl animate-pulse"></div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
                            <tr>
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <th key={i} className="px-6 py-4">
                                        <div className="h-4 w-20 bg-blue-gray-200 rounded animate-pulse"></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-gray-100">
                            {[...Array(skeletonRows)].map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <td className="px-6 py-4">
                                        <div className="h-5 w-32 bg-blue-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-5 w-16 bg-blue-gray-200 rounded-full"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-5 w-28 bg-blue-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-5 w-20 bg-blue-gray-200 rounded-full"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-5 w-24 bg-blue-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <div className="w-9 h-9 bg-blue-gray-200 rounded-lg"></div>
                                            <div className="w-9 h-9 bg-blue-gray-200 rounded-lg"></div>
                                            <div className="w-9 h-9 bg-blue-gray-200 rounded-lg"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
                        <div className="h-4 w-24 bg-blue-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-16 bg-blue-gray-200 rounded mt-2 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};