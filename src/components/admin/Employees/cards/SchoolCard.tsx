
import { FaSchool, FaUserTie, FaUsers } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import type { School } from '../../../../type/school.type';


type SchoolCardProps = {
    school: School;
}

function SchoolCard({
    school,
}:SchoolCardProps) {
              
    return (
        <Link 
            to={`/admin/employees/school/${school.id}`}
        >
            <div 
                className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6 transition-all duration-300 hover:shadow-md cursor-pointer hover:-translate-y-1"
            >
                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 flex-shrink-0">
                        <FaSchool className="text-blue-600 text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-dark-blue-800 text-lg truncate">{school.name}</h4>
                        <p className="text-sm text-blue-gray-500">{school.type}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-blue-gray-100">
                    <div className="flex items-center gap-2">
                        <FaUserTie className="text-blue-gray-400 text-base" />
                        <div>
                            <span className="text-lg font-bold text-dark-blue-700">{school.employeesCount}</span>
                            <span className="text-xs text-blue-gray-400 ml-1">Employees</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaUsers className="text-blue-gray-400 text-base" />
                        <div>
                            <span className="text-lg font-bold text-dark-blue-700">{school.studentsCount || 0}</span>
                            <span className="text-xs text-blue-gray-400 ml-1">Students</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SchoolCard