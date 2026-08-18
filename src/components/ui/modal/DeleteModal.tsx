// core/components/ui/DeleteModal.tsx
'use client';

import { MdWarning } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/utils';


interface DeleteModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    item: {
        id: number;
        name: string;
    } | null;
    title?: string;
    entityName?: string;
    onDelete: (id: number) => Promise<any>;
    successMessage?: string;
    isLoading?: boolean;
}

function DeleteModal({
    isOpen,
    setIsOpen,
    item,
    title = 'Delete Item',
    entityName = 'item',
    onDelete,
    successMessage = `${entityName} deleted successfully`,
    isLoading = false,
}: DeleteModalProps) {

    if (!isOpen || !item) return null;

    const handleDelete = async () => {
        try {
            await onDelete(item.id);
            toast.success(successMessage);
            setIsOpen(false);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return createPortal(
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-xl p-4 sm:p-5 md:p-6 max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-red-100 rounded-full p-2'>
                            <MdWarning className='text-red-600 text-2xl' />
                        </div>
                        <h3 className='text-lg sm:text-xl font-semibold text-gray-900'>
                            {title}
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <div className='mb-6'>
                    <p className='text-sm sm:text-base text-gray-600'>
                        Are you sure you want to delete <span className="font-semibold text-gray-800">"{item.name}"</span>?
                    </p>
                    <p className='text-sm text-gray-500 mt-2'>
                        This action cannot be undone and will remove all associated data.
                    </p>
                </div>

                <div className='flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3'>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 cursor-pointer text-sm sm:text-base font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base font-medium"
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default DeleteModal;