import { FaSpinner } from 'react-icons/fa';
import { useSchools } from '../../../hooks/admin/school/useSchool'
import SchoolCard from './cards/SchoolCard'

function SchoolsList() {
    const {data: schools, isLoading, error} = useSchools();

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
                <div className="p-8 text-center">
                    <FaSpinner className="animate-spin text-dark-blue-700 text-4xl mx-auto mb-4" />
                    <p className="text-blue-gray-500">Loading schools...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
                <div className="p-8 text-center">
                    <p className="text-red-600">Error loading schools: {error.message}</p>
                </div>
            </div>
        )
    }

    if (!schools || schools.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
                <div className="p-8 text-center">
                    <p className="text-blue-gray-500">No schools found</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold text-blue-gray-600 uppercase tracking-wider">School Name</th>
                            <th className="px-6 py-4 text-left font-semibold text-blue-gray-600 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left font-semibold text-blue-gray-600 uppercase tracking-wider">Employees</th>
                            <th className="px-6 py-4 text-left font-semibold text-blue-gray-600 uppercase tracking-wider">Students</th>
                            <th className="px-6 py-4 text-right font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-gray-100">
                        {schools.map((school) => (
                            <SchoolCard key={school.id} school={school} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SchoolsList