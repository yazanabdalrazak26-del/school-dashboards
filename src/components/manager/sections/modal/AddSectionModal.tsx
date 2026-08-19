import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCounselors } from '../../../../hooks/manager/counselors/useCounselors';
import { getErrorMessage } from '../../../../utils/utils';
import { useCreateSection } from '../../../../hooks/manager/sections/useSectionMutation';
import { createPortal } from 'react-dom';
import type { GradeSectionsResponse } from '../../../../type/manager.type';

type AddSectionModalProps = {
    isOpen: boolean;
    grade: GradeSectionsResponse;
    onClose: () => void;
}

function AddSectionModal({ isOpen, grade, onClose }: AddSectionModalProps) {
    const { data: counselorsData, isLoading: counselorsLoading } = useCounselors();
    const { mutateAsync: createSection, isPending } = useCreateSection();
    
    const [name, setName] = useState('');
    const [localCounselorId, setLocalCounselorId] = useState<number | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setLocalCounselorId(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const counselors = counselorsData?.data.counselors || [];

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error('Section name is required');
            return;
        }

        if (!grade) {
            toast.error('Grade data is missing');
            return;
        }

        try {
            await createSection({
                gradeId: grade.localGradeNumber,
                data: {
                    name: name.trim(),
                    localCounselorId: localCounselorId || 0
                }
            });
            
            toast.success('Section created successfully');
            onClose();

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-dark-blue-100 rounded-full p-2.5">
                            <FaPlus className="text-dark-blue-700 text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-dark-blue-800">Add New Section</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        disabled={isPending}
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                {/* Grade Info */}
                <div className="bg-blue-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-blue-gray-500">Adding section to:</p>
                    <p className="text-sm font-semibold text-dark-blue-800">{grade.gradeName}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                            Section Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 text-sm"
                            placeholder="Enter section name (e.g., الشعبة أ)"
                            disabled={isPending}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                            Counselor
                        </label>
                        {counselorsLoading ? (
                            <div className="flex items-center justify-center py-3">
                                <FaSpinner className="animate-spin text-dark-blue-700 text-xl" />
                            </div>
                        ) : counselors.length === 0 ? (
                            <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                No counselors available
                            </div>
                        ) : (
                            <select
                                value={localCounselorId || ''}
                                onChange={(e) => setLocalCounselorId(Number(e.target.value))}
                                className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
                                disabled={isPending}
                            >
                                <option value="">Select a counselor</option>
                                {counselors.map((counselor) => (
                                    <option key={counselor.employeeId} value={counselor.localEmployeeNumber}>
                                        {counselor.name}
                                    </option>
                                ))}
                            </select>
                        )}
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
                                'Create Section'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default AddSectionModal;