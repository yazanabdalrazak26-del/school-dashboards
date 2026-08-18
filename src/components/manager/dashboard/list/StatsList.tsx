import React from 'react'
import type { OverView } from '../../../../type/manager.type';
import { FaUserGraduate, FaUserTie, FaUsers, FaClipboardList } from 'react-icons/fa';

function StatsList({statsData }: {statsData: OverView | undefined}) {
    

    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600',
    };

    const stats = [
        { 
            label: 'Total Students', 
            value: statsData?.students || 0, 
            icon: <FaUserGraduate />, 
            color: 'blue'
        },
        { 
            label: 'Total Employees', 
            value: statsData?.employees || 0, 
            icon: <FaUserTie />, 
            color: 'emerald'
        },
        { 
            label: 'Total Sections', 
            value: statsData?.sections || 0, 
            icon: <FaUsers />, 
            color: 'purple'
        },
        { 
            label: 'Total Subjects', 
            value: statsData?.subjects || 0, 
            icon: <FaClipboardList />, 
            color: 'orange'
        },
        { 
            label: 'Students with Warning', 
            value: statsData?.studentsWithDismissalWarning || 0, 
            icon: <FaUserGraduate />, 
            color: 'red'
        },
        { 
            label: 'Employees with Warning', 
            value: statsData?.employeesWithDismissalWarning || 0, 
            icon: <FaUserTie />, 
            color: 'red'
        },
    ];
      
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-gray-500">{stat.label}</p>
                        <p className="text-2xl lg:text-3xl font-bold text-dark-blue-800 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                        {stat.icon}
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default StatsList