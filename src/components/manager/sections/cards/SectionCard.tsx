import { FaEye, FaEdit, FaTrash, FaUserTie, FaCalendar } from 'react-icons/fa';
import { formatDate } from '../../../../utils/utils';
import type { SectionResponse } from '../../../../type/manager.type';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditSectionModal from '../modal/EditSectionModal';
import DeleteModal from '../../../ui/modal/DeleteModal';
import { useDeleteSection } from '../../../../hooks/manager/sections/useSectionMutation';
import { useDeleteScheduleSection } from '../../../../hooks/manager/managemets/useManagementMutations';

function SectionCard({ section }: {section: SectionResponse}) {
    const navigate = useNavigate();
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const handleNavigate = () => {
        navigate(`/manager/grades/${section.localGradeNumber}/section/${section.localSectionNumber}`);
    };

    const {mutateAsync: deleteSection , isPending} = useDeleteScheduleSection();

    const handleDelete = async () => {
        await deleteSection({ sectionId: section.localSectionNumber , gradeId: section.localGradeNumber });
    };

    return (
        <>
            <tr className="hover:bg-blue-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-dark-blue-800">{section.name}</td>
                <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        #{section.localSectionNumber}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-blue-gray-600">
                        <FaUserTie className="text-blue-gray-400 text-sm" />
                        {section.counselorName || 'Not assigned'}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        section?.studentsCount as number > 0 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-500'
                    }`}>
                        {section.studentsCount} students
                    </span>
                </td>
                <td className="px-6 py-4 text-blue-gray-500 text-sm">
                    <div className="flex items-center gap-1.5">
                        <FaCalendar className="text-blue-gray-400 text-xs" />
                        {formatDate(section.createdAt)}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                        <button 
                            className="p-2 cursor-pointer hover:text-blue-800 text-blue-500 rounded-lg transition-colors" 
                            title="View"
                            onClick={handleNavigate}
                        >
                            <FaEye />
                        </button>
                        <button 
                            className="p-2 cursor-pointer hover:text-green-800 text-green-500 rounded-lg transition-colors" 
                            title="Edit"
                            onClick={() => setIsOpenEdit(true)}
                        >
                            <FaEdit />
                        </button>
                        <button 
                            className="p-2 cursor-pointer hover:text-red-800 text-red-500 rounded-lg transition-colors" 
                            title="Delete"
                            onClick={() => setIsOpenDelete(true)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </td>
            </tr>

            <EditSectionModal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)} section={section}/>

            <DeleteModal
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                item={{ id: section.localSectionNumber, name: section.name }}
                title="Delete Section"
                entityName="section"
                onDelete={handleDelete}
                isLoading={isPending}
            />
        </>
    );
}

export default SectionCard;