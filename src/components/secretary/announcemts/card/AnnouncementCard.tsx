import { useState } from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import type { Announcement } from '../../../../type/secretary.type'
import { useDeleteAnnouncements } from '../../../../hooks/secretary/annoucements/useAnnouncementMutation';
import DeleteModal from '../../../ui/modal/DeleteModal';
import { formatDate } from '../../../../utils/utils';
import ShowAnnouncementModal from '../modal/ShowAnnouncementModal';
import EditAnnouncementModal from '../modal/EditAnnouncementModal';

type AnnouncementCardProps = {
  announcement: Announcement;
}

function AnnouncementCard({announcement} : AnnouncementCardProps) {

  const {mutateAsync: deleteAnnouncement , isPending} = useDeleteAnnouncements();
  const [isOpenDelete , setIsOpenDelete] = useState(false)
  const [isOpenShow , setIsOpenShow] = useState(false)
  const [isOpenEdit , setIsOpenEdit] = useState(false)

  const handleDelete = async() =>{
    await deleteAnnouncement({id: announcement.localId})
  }

  return (
    <>
      <tr  className="hover:bg-blue-gray-50 transition-colors">
        <td className="px-6 py-4 font-medium text-dark-blue-800">{announcement.title}</td>
        <td className="px-6 py-4 text-sm text-blue-gray-600 max-w-xs truncate">
          {announcement.description}
        </td>
        <td className="px-6 py-4 text-sm text-blue-gray-600">
          {new Date(announcement.date).toLocaleDateString('ar-EG')}
        </td>
        <td className="px-6 py-4 text-sm text-blue-gray-600">
          {announcement.expiryDate ? formatDate(announcement.expiryDate) : 'Never'}
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-end gap-2">
            <button 
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="View"
              onClick={() => setIsOpenShow(true)}
            >
              <FaEye />
            </button>
            <button 
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer" title="Edit"
              onClick={() => setIsOpenEdit(true)}
            >
              <FaEdit />
            </button>
            <button 
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete"
              onClick={() => setIsOpenDelete(true)}
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>

      <DeleteModal
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        item={{
          id: announcement.localId,
          name: announcement.title
        }}
        title='Delete Annoucenemnt'
        entityName='announcement'
        onDelete={handleDelete}
        isLoading={isPending}
      />

      <ShowAnnouncementModal
        isOpen={isOpenShow}
        setIsOpen={setIsOpenShow}
        localId={announcement.localId}
      />

      <EditAnnouncementModal
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        announcement={announcement}
      />
    </>
  )
}

export default AnnouncementCard