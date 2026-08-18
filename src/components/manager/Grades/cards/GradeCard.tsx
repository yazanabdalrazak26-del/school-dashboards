import { FaUsers, FaUserGraduate, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { getGradeStats } from '../../../../utils/manager.utils';
import type { Grade } from '../../../../type/manager.type';
import { useNavigate } from 'react-router-dom';
import EditGradeModal from '../modal/EditGradeModal';
import { useState } from 'react';
import DeleteModal from '../../../ui/modal/DeleteModal';
import { useDeleteGrade } from '../../../../hooks/manager/grades/useGradeMutations';

type GradeCardProps = {
    grade: Grade;
}

function GradeCard({grade}: GradeCardProps) {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const { totalSections, totalStudents } = getGradeStats(grade);
    const { mutateAsync: deleteGrade , isPending} = useDeleteGrade();
    const navigate = useNavigate();

    const handleNavigate = () =>{
        navigate(`/manager/grades/${grade.localGradeNumber}`);
    }

    const handleDelete = async() =>{
        await deleteGrade({id: grade.localGradeNumber});
    }
  
    return (
        <>
            <tr className="hover:bg-blue-gray-50 transition-colors">
                <td className="px-6 py-4">
                    <div className="font-semibold text-dark-blue-800">{grade.name}</div>
                </td>
                <td className="px-6 py-4 text-blue-gray-600">{grade.level}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                        <FaUsers className="text-blue-gray-400 text-sm" />
                        <span className="text-blue-gray-600">{totalSections}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                        <FaUserGraduate className="text-blue-gray-400 text-sm" />
                        <span className="text-blue-gray-600">{totalStudents}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                        <button className="p-2 cursor-pointer hover:text-blue-800 text-blue-500 rounded-lg transition-colors" title="View Sections" onClick={handleNavigate}>
                            <FaEye />
                        </button>
                        <button className="p-2 cursor-pointer hover:text-green-800 text-green-500 rounded-lg transition-colors" title="Edit" onClick={() => setIsOpenEdit(true)}>
                            <FaEdit />
                        </button>
                        <button className="p-2 cursor-pointer hover:text-red-800 text-red-500 rounded-lg transition-colors" title="Delete" onClick={() => setIsOpenDelete(true)}>
                            <FaTrash />
                        </button>
                    </div>
                </td>
            </tr>

            <EditGradeModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} grade={{id: grade.localGradeNumber, name:grade.name}}/>

            <DeleteModal
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                item={{ id: grade.localGradeNumber, name: grade.name }}
                title="Delete Grade"
                entityName="grade"
                onDelete={handleDelete}
                isLoading={isPending}
            />
        </>
    );
}

export default GradeCard;