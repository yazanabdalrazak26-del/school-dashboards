
import { 
  FaBullhorn, 
  FaPlus, 
} from 'react-icons/fa';
import AnnouncemetsList from '../../components/secretary/announcemts/AnnouncementsList';
import { useState } from 'react';
import AddAnnouncementModal from '../../components/secretary/announcemts/modal/AddAnnouncementModal';

function Announcements() {
    const [isOpen , setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaBullhorn className="text-dark-blue-700" />
            Announcements
          </h1>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Manage school announcements and notifications
          </p>
        </div>
        <button 
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 hover:bg-dark-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => setIsOpen(true)}
        >
          <FaPlus />
          New Announcement
        </button>
      </div>

      <AnnouncemetsList/>

      <AddAnnouncementModal isOpen={isOpen} setIsOpen={setIsOpen}/>

    </div>
  );
}

export default Announcements;