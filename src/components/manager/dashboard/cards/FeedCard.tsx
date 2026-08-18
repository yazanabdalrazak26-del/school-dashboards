
import { FaBullhorn, FaCalendar, FaRunning } from 'react-icons/fa'
import { formatDate } from '../../../../utils/utils'
import type {FeedItem } from '../../../../type/manager.type';

function FeedCard({
    item
}: {item: FeedItem}) {
    const getIcon = (type: string) => {
        if (type === 'announcement') {
        return <FaBullhorn className="text-blue-500" />;
        }
        return <FaRunning className="text-emerald-500" />;
    };

  return (
    <div className="px-6 py-4 hover:bg-blue-gray-50 transition-colors">
        <div className="flex items-start gap-3">
            <div className="mt-1">
            {getIcon(item.type)}
            </div>
            <div className="flex-1">
            <div className="flex items-center gap-2">
                <p className="font-semibold text-dark-blue-800">{item.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                item.type === 'announcement' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                {item.type === 'announcement' ? 'Announcement' : 'Activity'}
                </span>
            </div>
            {item.description && item.description.trim() && item.description !== ' ' && (
                <p className="text-sm text-blue-gray-600 mt-0.5">{item.description}</p>
            )}
            <div className="flex items-center gap-3 mt-1.5 text-xs text-blue-gray-400">
                <span className="flex items-center gap-1">
                <FaCalendar size={10} />
                {formatDate(item.date)}
                </span>
                {item.schoolName && (
                <span>{item.schoolName}</span>
                )}
            </div>
            </div>
        </div>
    </div>
  )
}

export default FeedCard