import { FaTimes, FaBook } from 'react-icons/fa';
import { useUpdateGrade } from '../../../../hooks/manager/grades/useGradeMutations';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import { getErrorMessage } from '../../../../utils/utils';

type EditGradeModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    grade: {
        id: number;
        name: string;
    };
}

function EditGradeModal({ isOpen, setIsOpen, grade }: EditGradeModalProps) {

    if (!isOpen) return null;
    
    const extractGradeNumber = (name: string) => {
        const match = name.match(/\d+/);
        return match ? match[0] : '';
    };

    const [number, setNumber] = useState<string>(extractGradeNumber(grade.name));
    const { mutateAsync: updateGrade, isPending: isLoading } = useUpdateGrade();

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!number) {
            toast.error('Please select a grade number');
            return;
        }

        try {
            const response = await updateGrade({ 
                id: grade.id,  
                data: { level: Number(number) }
            });
            toast.success(response.message);
            setIsOpen(false);
        } catch (e) {
            toast.error(getErrorMessage(e));
        }
    }

    const gradeOptions = Array.from({ length: 12 }, (_, i) => i + 1);

    return createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark-blue-800">Edit Grade</h2>
                        <p className="text-sm text-blue-gray-500 mt-1">Update the grade number</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleEdit}>
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                            Grade Number <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white appearance-none cursor-pointer hover:border-dark-blue-400"
                            required
                        >
                            <option value="">Select grade number</option>
                            {gradeOptions.map((gradeNum) => (
                                <option key={gradeNum} value={gradeNum}>
                                    Grade {gradeNum}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-blue-gray-400 mt-1.5">Choose a grade number from 1 to 12</p>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-blue-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 text-white bg-dark-blue-700 rounded-lg hover:bg-dark-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default EditGradeModal;