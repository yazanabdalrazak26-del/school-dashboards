
import { FiX, FiImage } from 'react-icons/fi'
import type { Teacher } from '../../../../type/manager.type'
import type { ScheduleTeacherResponse } from '../../../../type/manager.type'
import { createPortal } from 'react-dom';
import { formatDate } from '../../../../utils/utils';
import { FaRegImage } from 'react-icons/fa';

type ScheduleImageViewerProps = {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher;
    schedule: ScheduleTeacherResponse | null | undefined;
    isLoading: boolean;
};

export const ShowTeacherSchedule = ({
    isOpen,
    onClose,
    teacher,
    schedule,
    isLoading
}: ScheduleImageViewerProps) => {
    
    if (!isOpen) return null;

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
 
        const cleanPath = imagePath.replace(/^\/+/, '');
        return `http://localhost:5000/${cleanPath}`;
    };

    const imageUrl = schedule?.image?.imageUrl ? getImageUrl(schedule.image.imageUrl) : null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-blue-gray-100">
                    <div>
                        <h3 className="text-lg font-semibold text-dark-blue-800">
                            Schedule Image
                        </h3>
                        <p className="text-sm text-blue-gray-500">
                            {teacher.name}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-blue-gray-400 hover:text-dark-blue-600 hover:bg-blue-gray-50 rounded-lg transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-12 h-12 border-4 border-dark-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-blue-gray-500 mt-3">Loading image...</p>
                        </div>
                    ) : imageUrl ? (
                        <div className="flex flex-col items-center">
                            <div className="relative w-full max-h-[60vh] overflow-hidden rounded-xl bg-blue-gray-50">
                                <img
                                    src={imageUrl}
                                    alt="Schedule"
                                    className="w-full h-auto object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder-image.png';
                                    }}
                                />
                            </div>
                            {schedule?.image?.description && (
                                <p className="text-sm text-blue-gray-600 mt-3">
                                    {schedule.image.description}
                                </p>
                            )}
                            <p className="text-xs text-blue-gray-400 mt-1">
                                Uploaded: {formatDate(schedule?.image?.createdAt || new Date().toISOString())}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="text-5xl mb-4">
                                <FaRegImage className="w-16 h-16 text-gray-300" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-700 mb-1">No Image Available</h4>
                            <p className="text-sm text-blue-gray-600">
                                No schedule image has been uploaded for this teacher yet.
                            </p>
                            <p className="text-xs text-blue-gray-400 mt-2">
                                Click the "Add Image" button to upload a schedule image.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-blue-gray-100 bg-blue-gray-50/50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 border-2 border-blue-gray-200 text-blue-gray-600 rounded-xl hover:bg-blue-gray-100 transition-colors font-medium text-sm"
                    >
                        Close
                    </button>
                    {imageUrl && (
                        <a
                            href={imageUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-dark-blue-600 hover:bg-dark-blue-700 text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center gap-2"
                        >
                            <FiImage size={14} />
                            Download
                        </a>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ShowTeacherSchedule;