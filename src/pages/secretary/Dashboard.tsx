import React from 'react';
import { 
  FaBullhorn, 
  FaUserGraduate, 
  FaUsers,
  FaCalendarAlt,
  FaFileAlt,
  FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const mockStats = [
  { label: 'Total Announcements', value: '12', icon: <FaBullhorn />, color: 'blue' },
  { label: 'Total Students', value: '156', icon: <FaUserGraduate />, color: 'green' },
  { label: 'Active Students', value: '142', icon: <FaUsers />, color: 'emerald' },
  { label: 'Recent Activity', value: '8', icon: <FaCalendarAlt />, color: 'purple' },
];

const mockAnnouncements = [
  { id: 1, title: 'اجتماع المعلمين', description: 'اجتماع المعلمين يوم الأربعاء القادم', date: '2026-08-18' },
  { id: 2, title: 'موعد الامتحانات', description: 'تبدأ الامتحانات النهائية يوم 15 يناير', date: '2026-08-17' },
  { id: 3, title: 'بدء العام الدراسي', description: 'يبدأ العام الدراسي الجديد يوم الأحد القادم', date: '2026-08-16' },
];

const mockStudents = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@school.sy', grade: 'الصف العاشر', localStudentNumber: 1001 },
  { id: 2, name: 'سارة علي', email: 'sara@school.sy', grade: 'الصف الحادي عشر', localStudentNumber: 1002 },
  { id: 3, name: 'محمد خالد', email: 'mohammed@school.sy', grade: 'الصف التاسع', localStudentNumber: 1003 },
  { id: 4, name: 'فاطمة حسن', email: 'fatima@school.sy', grade: 'الصف العاشر', localStudentNumber: 1004 },
  { id: 5, name: 'علي رضا', email: 'ali@school.sy', grade: 'الصف الثامن', localStudentNumber: 1005 },
];

function SecretaryDashboard() {
  const navigate = useNavigate();

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaFileAlt className="text-dark-blue-700" />
            Secretary Dashboard
          </h1>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Overview of announcements and student management
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-blue-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-dark-blue-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Announcements & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-dark-blue-800 flex items-center gap-2">
              <FaBullhorn className="text-blue-600" />
              Recent Announcements
            </h2>
            <button 
              onClick={() => navigate('/secretary/announcements')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All <FaArrowRight className="text-xs" />
            </button>
          </div>
          <div className="divide-y divide-blue-gray-50">
            {mockAnnouncements.map((announcement) => (
              <div key={announcement.id} className="px-6 py-4 hover:bg-blue-gray-50 transition-colors">
                <p className="font-medium text-dark-blue-800">{announcement.title}</p>
                <p className="text-sm text-blue-gray-500 line-clamp-1">{announcement.description}</p>
                <p className="text-xs text-blue-gray-400 mt-1">
                  {new Date(announcement.date).toLocaleDateString('ar-EG')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-blue-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-dark-blue-800 flex items-center gap-2">
              <FaUserGraduate className="text-green-600" />
              Recent Students
            </h2>
            <button 
              onClick={() => navigate('/secretary/students')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All <FaArrowRight className="text-xs" />
            </button>
          </div>
          <div className="divide-y divide-blue-gray-50">
            {mockStudents.map((student) => (
              <div key={student.id} className="px-6 py-4 hover:bg-blue-gray-50 transition-colors">
                <p className="font-medium text-dark-blue-800">{student.name}</p>
                <p className="text-sm text-blue-gray-500">{student.email}</p>
                <p className="text-xs text-blue-gray-400 mt-1">
                  #{student.localStudentNumber} • {student.grade}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecretaryDashboard;