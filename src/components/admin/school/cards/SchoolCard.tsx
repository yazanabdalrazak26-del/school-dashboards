import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import type { School } from '../../../../type/school.type'
import { useState } from 'react'

import EditSchoolModal from '../modal/EditSchoolModal';
import ShowSchoolModal from '../modal/ShowSchoolModal';
import DeleteModal from '../../../ui/modal/DeleteModal';
import { useDeleteSchool } from '../../../../hooks/admin/school/useSchoolMutation';

function SchoolCard({school}: {school: School}) {

    const [isOpenDelete , setIsOpenDelete] = useState(false);
    const [isOpenUpdate , setIsOpenUpdate] = useState(false);
    const [isOpenShow , setIsOpenShow] = useState(false);
    const {mutateAsync: deleteSchool , isPending} = useDeleteSchool();

    const handleDelete = async () => {
        await deleteSchool({ id: school.id });
    };

    return (
        <>
            <tr className="hover:bg-blue-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-dark-blue-800">{school.name}</div>
                </td>
                <td className="px-6 text-sm py-4 whitespace-nowrap text-blue-gray-600">{school.type}</td>
                <td className="px-6 text-sm py-4 whitespace-nowrap text-blue-gray-600 font-medium">{school.employeesCount}</td>
                <td className="px-6 text-sm py-4 whitespace-nowrap text-blue-gray-600 font-medium">{school.studentsCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-end items-center gap-1.5">
                        <button 
                            className="p-2 hover:text-blue-800 text-blue-500 rounded-lg transition-colors cursor-pointer" title="View"
                            onClick={() => setIsOpenShow(true)}
                        >
                            <FaEye size={15}/>
                        </button>
                        <button 
                            className="p-2 hover:text-green-800 text-green-500 rounded-lg transition-colors cursor-pointer" title="Edit"
                            onClick={() => setIsOpenUpdate(true)}
                        >
                            <FaEdit size={15}/>
                        </button>
                        <button 
                            className="p-2 hover:text-red-800  text-red-500 rounded-lg transition-colors cursor-pointer" title="Delete"
                            onClick={() => setIsOpenDelete(true)}
                        >
                            <FaTrash size={15}/>
                        </button>
                    </div>
                </td>
            </tr>

            {/* <DeleteSchoolModal isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} school={school}/> */}
            <DeleteModal isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} item={school} title='Delete School' entityName='School' onDelete={handleDelete} isLoading={isPending}/>
            <EditSchoolModal isOpen={isOpenUpdate} setIsOpen={setIsOpenUpdate} school={school}/>
            <ShowSchoolModal isOpen={isOpenShow} setIsOpen={setIsOpenShow} school={school}/>
        </>

    )
}

export default SchoolCard