import { 
  FaSchool, 
  FaUsers, 
  FaUserTie, 
  FaChartBar, 
  FaArrowUp, 
  FaArrowDown, 
  FaSpinner,
  FaArrowRight,
} from 'react-icons/fa';
import { useSchools } from '../../hooks/admin/school/useSchool';
import { Link } from 'react-router-dom';
import SchoolCard from '../../components/admin/dashboard/SchoolCard';
import TopSchoolCard from '../../components/admin/dashboard/TopSchoolCard';

const Dashboard = () => {
  const { data: schools, isLoading } = useSchools();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-dark-blue-700 text-5xl mb-4" />
        <p className="text-blue-gray-500 text-sm">Loading dashboard...</p>
      </div>
    );
  }

  const totalSchools = schools?.length || 0;
  const totalEmployees = schools?.reduce((acc, s) => acc + (s.employeesCount || 0), 0) || 0;
  const totalStudents = schools?.reduce((acc, s) => acc + (s.studentsCount || 0), 0) || 0;
  const totalSections = schools?.reduce((acc, s) => acc + (s.sectionsCount || 0), 0) || 0;

  const topSchools = [...(schools || [])]
    .sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0))
    .slice(0, 3);


  const stats = [
    { 
      label: 'Total Schools', 
      value: totalSchools.toString(), 
      icon: <FaSchool />, 
      change: totalSchools > 0 ? '+12%' : '0%',
      trend: totalSchools > 0 ? 'up' : 'down'
    },
    { 
      label: 'Total Employees', 
      value: totalEmployees.toLocaleString(), 
      icon: <FaUserTie />, 
      change: totalEmployees > 0 ? '+8%' : '0%',
      trend: totalEmployees > 0 ? 'up' : 'down'
    },
    { 
      label: 'Total Students', 
      value: totalStudents.toLocaleString(), 
      icon: <FaUsers />, 
      change: totalStudents > 0 ? '+5%' : '0%',
      trend: totalStudents > 0 ? 'up' : 'down'
    },
    { 
      label: 'Total Sections', 
      value: totalSections.toString(), 
      icon: <FaChartBar />, 
      change: totalSections > 0 ? '+23%' : '0%',
      trend: totalSections > 0 ? 'up' : 'down'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800">Dashboard</h2>
        <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
          Welcome back! Here's what's happening with your schools today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-gray-500">{stat.label}</p>
                <p className="text-2xl lg:text-3xl font-bold text-dark-blue-800 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-dark-blue-100 rounded-2xl text-dark-blue-700">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              {stat.trend === 'up' ? <FaArrowUp className="text-green-600 text-xs" /> : <FaArrowDown className="text-red-600 text-xs" />}
              <span className="text-sm text-blue-gray-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark-blue-800">Recent Schools</h3>
            <Link 
              to="/admin/schools"
              className="text-sm text-dark-blue-700 font-medium hover:text-dark-blue-800 transition-colors flex items-center gap-1"
            >
              View All <FaArrowRight className="text-sm" />
            </Link>
          </div>
          <div className="space-y-4">
            {schools?.slice(0, 3).length as number > 0 ? (
              schools?.slice(0, 3).map((school) => (
                <SchoolCard school={school} key={school.id}/>
              ))
            ) : (
              <div className="text-center py-8 text-blue-gray-500">
                No schools found
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark-blue-800">Top Schools</h3>
            <Link 
              to="/admin/schools"
              className="text-sm text-dark-blue-700 font-medium hover:text-dark-blue-800 transition-colors flex items-center gap-1"
            >
              View All <FaArrowRight className="text-sm" />
            </Link>
          </div>
          <div className="space-y-4">
            {topSchools.length > 0 ? (
              topSchools.map((school, index) => (
                <TopSchoolCard key={index} school={school} index={index}/>
              ))
            ) : (
              <div className="text-center py-8 text-blue-gray-500">
                No schools available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;