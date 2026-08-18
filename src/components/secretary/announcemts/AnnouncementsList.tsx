import AnnouncemtCard from './card/AnnouncementCard';
import { useAnnouncements } from '../../../hooks/secretary/annoucements/useAnnouncements';
import { FaBullhorn } from 'react-icons/fa';
import Skeleton from './Skeleton';

function AnnouncemetsList() {
  const {data: announcements , isLoading} = useAnnouncements();

  if(isLoading){
    return <Skeleton/>
  } 

  if (!announcements?.data?.announcements?.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-gray-50 rounded-full p-6">
            <FaBullhorn className="text-5xl text-blue-gray-300" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-dark-blue-800 mb-2">No Announcements</h3>
        <p className="text-blue-gray-500">No announcements available</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-100">
              {announcements?.data.announcements?.map((announcement) => (
                <AnnouncemtCard announcement={announcement}/>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default AnnouncemetsList