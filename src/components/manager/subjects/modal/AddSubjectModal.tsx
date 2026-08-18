import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaSpinner, FaBook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { useCreateSubject } from '../../../../hooks/manager/subjects/useSubjectsMutation';

type AddSubjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

function AddSubjectModal({ isOpen, onClose }: AddSubjectModalProps) {
    const { mutateAsync: createSubject, isPending } = useCreateSubject();
    const [name, setName] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setName('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error('Subject name is required');
            return;
        }

        try {
            await createSubject({
                data: {
                    Name: name.trim()
                }
            });
            
            toast.success('Subject created successfully');
            onClose();

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-dark-blue-100 rounded-full p-2.5">
                            <FaPlus className="text-dark-blue-700 text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-dark-blue-800">Add New Subject</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        disabled={isPending}
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                            Subject Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2.5 pl-10 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 text-sm"
                                placeholder="Enter subject name"
                                disabled={isPending}
                                required
                                autoFocus
                            />
                            <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-gray-400 text-lg" />
                        </div>
                    </div>


                    <div className="flex gap-3 mt-6 pt-4 border-t border-blue-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 px-4 py-2.5 border border-blue-gray-200 rounded-lg text-dark-blue-700 hover:bg-blue-gray-50 transition-colors text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-2.5 bg-dark-blue-700 text-white rounded-lg hover:bg-dark-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            {isPending ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Subject'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSubjectModal;