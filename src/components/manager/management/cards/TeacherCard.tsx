
import { FaImage, FaEye } from 'react-icons/fa'
import { FiUser, FiTrash2 } from 'react-icons/fi'
import type { Teacher } from '../../../../type/manager.type'
import { useScheduleTeacherById } from '../../../../hooks/manager/managemets/useManagements';
import ShowTeacherSchedule from '../modal/ShowTeacherSchedule';
import { useState } from 'react';
import { useDeleteScheduleTeacher } from '../../../../hooks/manager/managemets/useManagementMutations';
import DeleteModal from '../../../ui/modal/DeleteModal';

type TeacherCardProps = {
    teacher: Teacher;
    index: number
    openImageModal: (id: number, name: string, type: 'teacher' | 'section') => void;
}

function TeacherCard({
    teacher,
    index,
    openImageModal
}: TeacherCardProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);
    
    const { data: schedule, isLoading } = useScheduleTeacherById(
        teacher.localEmployeeNumber, 
        shouldFetch
    );
    
    const { mutateAsync: deleteSchedule, isPending } = useDeleteScheduleTeacher();
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const handleDelete = async () => {
        await deleteSchedule({ id: teacher.localEmployeeNumber });
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
                        <FiUser className="text-blue-gray-400" size={14} />
                        {teacher.name}
                    </div>
                </td>
                <td className="px-4 py-3 text-sm text-blue-gray-600">{teacher.email}</td>
                <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        teacher.isActive !== false
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            teacher.isActive !== false ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        {teacher.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="px-4 py-3">
                    <button 
                        onClick={() => openImageModal(teacher.localEmployeeNumber, teacher.name, 'teacher')}
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
                        >
                            <FaEye size={16} />
                        </button>
                        <button 
                            className="p-1.5 text-blue-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => setIsOpenDelete(true)}
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </td>
            </tr>

            <ShowTeacherSchedule 
                isLoading={isLoading} 
                isOpen={isOpen} 
                onClose={handleCloseModal} 
                schedule={schedule} 
                teacher={teacher}
            />

            <DeleteModal
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                item={{ id: teacher.localEmployeeNumber, name: `Schedule from ${teacher.name}` }}
                title="Delete Teacher Schedule"
                entityName="teacher schedule"
                onDelete={handleDelete}
                isLoading={isPending}
            />
        </>
    )
}

export default TeacherCard