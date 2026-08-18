import { FaImage, FaEye } from 'react-icons/fa'
import { FiBookOpen, FiTrash2, FiUser } from 'react-icons/fi'
import type { Section } from '../../../../type/manager.type'
import { useScheduleSectionById } from '../../../../hooks/manager/managemets/useManagements';
import ShowSectionSchedule from '../modal/ShowSectionSchedule';
import { useState } from 'react';
import { useDeleteScheduleSection } from '../../../../hooks/manager/managemets/useManagementMutations';
import DeleteModal from '../../../ui/modal/DeleteModal';

type SectionCardProps = {
    section: Section;
    index: number
    openImageModal: (id: number, name: string, type: 'teacher' | 'section', sectionData?: { gradeId: number; sectionId: number }) => void;
}

function SectionCard({
    section,
    index,
    openImageModal
}: SectionCardProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);
    
    const { data: schedule, isLoading } = useScheduleSectionById(
        section.localGradeNumber || 0,
        section.localSectionNumber || 0,
        shouldFetch
    );
    
    const { mutateAsync: deleteSchedule, isPending } = useDeleteScheduleSection();
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const handleDelete = async () => {
        await deleteSchedule({ 
            gradeId: section.localGradeNumber || 0, 
            sectionId: section.localSectionNumber || 0 
        });
    };

    const handleViewImage = () => {
        setShouldFetch(true);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <tr className="hover:bg-blue-gray-50/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-dark-blue-700">
                    <div className="flex items-center gap-2">
                        <FiBookOpen className="text-blue-gray-400" size={14} />
                        {section.name}
                    </div>
                </td>
                <td className="px-4 py-3 text-sm text-blue-gray-600">
                    {section.gradeName || `Grade ${section.localGradeNumber}`}
                </td>
                <td className="px-4 py-3 text-sm text-blue-gray-600">
                    <div className="flex items-center gap-2">
                        <FiUser className="text-blue-gray-400" size={14} />
                        {section.counselorName || 'Not assigned'}
                    </div>
                </td>
                <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        section.studentsCount as number > 0 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-gray-100 text-gray-500'
                    }`}>
                        {section.studentsCount} students
                    </span>
                </td>
                <td className="px-4 py-3">
                    <button 
                        onClick={() => openImageModal(
                            section.localSectionNumber, 
                            section.name, 
                            'section',
                            { 
                                gradeId: section.localGradeNumber || 0, 
                                sectionId: section.localSectionNumber || 0 
                            }
                        )}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-blue-600 hover:bg-dark-blue-700 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                    >
                        <FaImage size={14} />
                        Add Image
                    </button>
                </td>
                <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                        <button 
                            className="p-1.5 text-blue-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={handleViewImage}
                            title="View Schedule Image"
                        >
                            <FaEye size={16} />
                        </button>
                        <button 
                            className="p-1.5 text-blue-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => setIsOpenDelete(true)}
                            title="Delete Schedule"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </td>
            </tr>

            <ShowSectionSchedule 
                isLoading={isLoading} 
                isOpen={isOpen} 
                onClose={handleCloseModal} 
                schedule={schedule} 
                section={section}
            />

            <DeleteModal
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                item={{ 
                    id: section.localSectionNumber || 0, 
                    name: `Schedule from ${section.name}` 
                }}
                title="Delete Section Schedule"
                entityName="section schedule"
                onDelete={handleDelete}
                isLoading={isPending}
            />
        </>
    )
}

export default SectionCard