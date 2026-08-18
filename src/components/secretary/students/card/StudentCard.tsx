import { useState } from 'react'
import type { Student } from '../../../../type/secretary.type'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import ShowStudentModal from '../modal/ShowStudentModal'
import EditStudentModal from '../modal/EditStudentModal'
import DeleteModal from '../../../ui/modal/DeleteModal'
import { useDeleteStudent } from '../../../../hooks/secretary/students/useStudentsMutation'

function StudentCard({
    student
}: {student: Student}) {
    const [isOpenShow, setIsOpenShow] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const { mutateAsync: deleteStudent, isPending } = useDeleteStudent();

    const handleDelete = async () => {
        await deleteStudent({ id: student.localStudentNumber })
    }

    return (
        <>
            <tr className="hover:bg-blue-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-dark-blue-800">
                    {student.localStudentNumber}
                </td>
                <td className="px-6 py-4 font-medium text-dark-blue-800">
                    {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-blue-gray-600">
                    {student.email}
                </td>
                <td className="px-6 py-4 text-sm text-blue-gray-600">
                    {student.gradeName}
                </td>
                <td className="px-6 py-4 text-sm text-blue-gray-600">
                    {student.sectionName}
                </td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${student.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                        <button 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" 
                            title="View" 
                            onClick={() => setIsOpenShow(true)}
                        >
                            <FaEye />
                        </button>
                        <button 
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer" 
                            title="Edit" 
                            onClick={() => setIsOpenEdit(true)}
                        >
                            <FaEdit />
                        </button>
                        <button 
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" 
                            title="Delete"
                            onClick={() => setIsOpenDelete(true)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </td>
            </tr>

            <ShowStudentModal 
                isOpen={isOpenShow} 
                setIsOpen={setIsOpenShow} 
                student={student}
            />

            <EditStudentModal 
                isOpen={isOpenEdit} 
                setIsOpen={setIsOpenEdit} 
                student={student}
            />

            <DeleteModal
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                item={{
                    id: student.localStudentNumber,
                    name: student.name
                }}
                title='Delete Student'
                entityName='student'
                onDelete={handleDelete}
                isLoading={isPending}
            />
        </>
    )
}

export default StudentCard