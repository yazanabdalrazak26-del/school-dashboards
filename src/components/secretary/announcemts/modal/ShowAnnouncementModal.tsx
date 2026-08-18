import { createPortal } from 'react-dom';
import { FaTimes, FaBullhorn, FaCalendar, FaUser, FaTag, FaUsers, FaClock, FaSpinner } from 'react-icons/fa';
import { useAnnouncementById } from '../../../../hooks/secretary/annoucements/useAnnouncements';

type ShowAnnouncementModalProps = {
    isOpen: boolean;
    localId: number;
    setIsOpen: (value: boolean) => void;
}

function ShowAnnouncementModal({ isOpen, setIsOpen, localId }: ShowAnnouncementModalProps) {
    if (!isOpen) return null;

    const { data: announcementResponse, isLoading } = useAnnouncementById(localId);
    const announcement = announcementResponse?.data;

    const getAudienceColor = (audience: string) => {
        const colors: Record<string, string> = {
            'All': 'bg-blue-100 text-blue-700',
            'Students': 'bg-green-100 text-green-700',
            'Teachers': 'bg-purple-100 text-purple-700',
            'Parents': 'bg-yellow-100 text-yellow-700',
            'Staff': 'bg-pink-100 text-pink-700',
            'Employees': 'bg-indigo-100 text-indigo-700',
            'Section': 'bg-orange-100 text-orange-700',
            'Grade': 'bg-teal-100 text-teal-700',
            'Administrators': 'bg-red-100 text-red-700',
        };
        return colors[audience] || 'bg-gray-100 text-gray-700';
    };

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            'General': 'bg-blue-100 text-blue-700',
            'Activity': 'bg-green-100 text-green-700',
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    const getStatusBadge = (isActive: boolean) => {
        return isActive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700';
    };

    const getStatusLabel = (isActive: boolean) => {
        return isActive ? 'Active' : 'Inactive';
    };

    if (isLoading) {
        return createPortal(
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-dark-blue-800">Announcement Details</h2>
                            <p className="text-sm text-blue-gray-500 mt-1">View announcement information</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12">
                        <FaSpinner className="animate-spin text-dark-blue-700 text-4xl mb-4" />
                        <p className="text-blue-gray-500 text-sm">Loading announcement...</p>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    if (!announcement) {
        return createPortal(
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-dark-blue-800">Announcement Details</h2>
                            <p className="text-sm text-blue-gray-500 mt-1">View announcement information</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="bg-red-50 rounded-full p-4 mb-4">
                            <FaBullhorn className="text-red-500 text-4xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-dark-blue-800 mb-2">Announcement Not Found</h3>
                        <p className="text-blue-gray-500 text-sm text-center">
                            The announcement you're looking for could not be found.
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark-blue-800">Announcement Details</h2>
                        <p className="text-sm text-blue-gray-500 mt-1">View announcement information</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-dark-blue-100 rounded-full flex items-center justify-center">
                            <FaBullhorn className="text-dark-blue-700 text-3xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-dark-blue-800 break-words">{announcement.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getAudienceColor(announcement.audience)}`}>
                                    {announcement.audience}
                                </span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(announcement.type)}`}>
                                    {announcement.type}
                                </span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadge(announcement.isActive)}`}>
                                    {getStatusLabel(announcement.isActive)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-gray-50 rounded-lg p-4">
                        <p className="text-xs text-blue-gray-400 flex items-center gap-1 mb-1">
                            <FaBullhorn className="text-xs" />
                            Description
                        </p>
                        <p className="text-sm text-dark-blue-800 mt-1 leading-relaxed">
                            {announcement.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaCalendar className="text-xs" />
                                Date
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {new Date(announcement.date).toLocaleDateString('ar-EG')}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaClock className="text-xs" />
                                Expiry Date
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {announcement.expiryDate 
                                    ? new Date(announcement.expiryDate).toLocaleDateString('ar-EG') 
                                    : 'Never'}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaUsers className="text-xs" />
                                Audience
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {announcement.audience}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaTag className="text-xs" />
                                Type
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {announcement.type}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3 col-span-2">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaUser className="text-xs" />
                                Created By
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {announcement.createdBy}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-blue-gray-100">
                        <p className="text-xs text-blue-gray-400">
                            Local ID: #{announcement.localId} • Record ID: #{announcement.id}
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default ShowAnnouncementModal;