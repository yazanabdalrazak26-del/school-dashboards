import { FaChalkboardTeacher, FaUserGraduate, FaClipboardList, FaBullhorn } from 'react-icons/fa';
import { useFeed, useOverView } from '../../hooks/manager/dashboard/useDashboard';
import StatsList from '../../components/manager/dashboard/list/StatsList';
import FeedCard from '../../components/manager/dashboard/cards/FeedCard';

const ManagerDashboard = () => {

  const {data: overviews , isLoading: isLoadingOverview} = useOverView();
  const {data: feed , isLoading: isLoadingFeeds} = useFeed();

  if (isLoadingOverview) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-blue-gray-100">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaChalkboardTeacher className="text-dark-blue-700" />
            Manager Dashboard
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Overview of grades, sections, subjects, and staff
          </p>
        </div>
      </div>

      <StatsList statsData={overviews?.statistics}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-gray-500">Open Complaints</p>
              <p className="text-2xl lg:text-3xl font-bold text-dark-blue-800 mt-1">
                {overviews?.statistics?.openComplaints || 0}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-2xl text-red-600">
              <FaClipboardList />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-gray-500">Absent Students Today</p>
              <p className="text-2xl lg:text-3xl font-bold text-dark-blue-800 mt-1">
                {overviews?.statistics?.absentStudentsToday || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
              <FaUserGraduate />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-blue-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark-blue-800 flex items-center gap-2">
            <FaBullhorn className="text-dark-blue-700" />
            Recent Updates
          </h3>
          <span className="text-sm text-blue-gray-400">Latest announcements & activities</span>
        </div>
        <div className="divide-y divide-blue-gray-50">
          {isLoadingFeeds ? (
            <div className="animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-6 py-4">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 mt-2"></div>
                </div>
              ))}
            </div>
          ) : feed?.data?.feed && feed.data.feed.length > 0 ? (
            feed.data.feed.map((item, index) => (
              <FeedCard item={item} key={index}/>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-blue-gray-500">
              No recent updates available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;