import React, { useState, useEffect } from 'react';
import { FaTimes, FaUsers, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { createPortal } from 'react-dom';
import type { Teacher, AssignToSection } from '../../../../type/manager.type';
import { useGrade } from '../../../../hooks/manager/grades/useGrades';
import { useAssignSection } from '../../../../hooks/manager/teachers/useTeacherMutations';
import { useSubjects } from '../../../../hooks/manager/subjects/useSubjects';

type AssignSectionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher
}

function AssignSectionModal({ isOpen, onClose, teacher }: AssignSectionModalProps) {
    const { data: grades, isLoading: gradesLoading } = useGrade();
    const { data: subjectsData, isLoading: subjectsLoading } = useSubjects();
    const { mutateAsync: assignSection, isPending } = useAssignSection();
    
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
    const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
    const [selectedGradeNumber, setSelectedGradeNumber] = useState<number | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setSelectedSubjectId(null);
            setSelectedSectionId(null);
            setSelectedGradeId(null);
            setSelectedGradeNumber(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const subjects = subjectsData || [];
    
    const getSectionsForGrade = () => {
        if (!selectedGradeId) return [];
        const grade = grades?.find((g: any) => g.id === selectedGradeId);
        return grade?.sections || [];
    };

    const getGradeNumber = (gradeId: number) => {
        const grade = grades?.find((g: any) => g.id === gradeId);
        return grade?.localGradeNumber || null;
    };

    const sections = getSectionsForGrade();

    const handleGradeChange = (gradeId: number) => {
        setSelectedGradeId(gradeId);
        setSelectedSectionId(null);
        const gradeNumber = getGradeNumber(gradeId);
        setSelectedGradeNumber(gradeNumber);
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!selectedSubjectId) {
            toast.error('Please select a subject');
            return;
        }

        if (!selectedSectionId) {
            toast.error('Please select a section');
            return;
        }

        if (!selectedGradeNumber) {
            toast.error('Please select a grade');
            return;
        }

        try {
            const payload: AssignToSection = {
                teacherLocalNumber: teacher.localEmployeeNumber,
                localGradeNumber: selectedGradeNumber,
                localSubjectId: selectedSubjectId,
                localSectionNumber: selectedSectionId
            };


            await assignSection(payload);
            
            toast.success('Section assigned successfully');
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
                        <div className="bg-green-100 rounded-full p-2.5">
                            <FaUsers className="text-green-700 text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-dark-blue-800">Assign Section</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        disabled={isPending}
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <div className="mb-5 p-4 bg-blue-gray-50 rounded-xl">
                    <p className="text-xs text-blue-gray-500 uppercase tracking-wider font-medium">Teacher</p>
                    <p className="text-lg font-semibold text-dark-blue-800">{teacher.name}</p>
                    <p className="text-sm text-blue-gray-500">Local Number: #{teacher.localEmployeeNumber}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                            Select Subject <span className="text-red-500">*</span>
                        </label>
                        {subjectsLoading ? (
                            <div className="flex items-center justify-center py-3">
                                <FaSpinner className="animate-spin text-dark-blue-700 text-xl" />
                            </div>
                        ) : subjects.length === 0 ? (
                            <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                No subjects available
                            </div>
                        ) : (
                            <select
                                value={selectedSubjectId || ''}
                                onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
                                className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
                                disabled={isPending}
                                required
                            >
                                <option value="">Select a subject</option>
                                {subjects.map((subject: any) => (
                                    <option key={subject.id} value={subject.localSubjectId}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                            Select Grade <span className="text-red-500">*</span>
                        </label>
                        {gradesLoading ? (
                            <div className="flex items-center justify-center py-3">
                                <FaSpinner className="animate-spin text-dark-blue-700 text-xl" />
                            </div>
                        ) : grades?.length === 0 ? (
                            <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                No grades available
                            </div>
                        ) : (
                            <select
                                value={selectedGradeId || ''}
                                onChange={(e) => handleGradeChange(Number(e.target.value))}
                                className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
                                disabled={isPending}
                                required
                            >
                                <option value="">Select a grade</option>
                                {grades?.map((grade: any) => (
                                    <option key={grade.id} value={grade.id}>
                                        {grade.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {selectedGradeId && (
                        <div>
                            <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                                Select Section <span className="text-red-500">*</span>
                            </label>
                            {sections.length === 0 ? (
                                <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                    No sections available for this grade
                                </div>
                            ) : (
                                <select
                                    value={selectedSectionId || ''}
                                    onChange={(e) => setSelectedSectionId(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
                                    disabled={isPending}
                                    required
                                >
                                    <option value="">Select a section</option>
                                    {sections.map((section: any) => (
                                        <option key={section.id} value={section.localSectionNumber}>
                                            {section.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

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
                            disabled={isPending || !selectedSubjectId || !selectedSectionId || !selectedGradeNumber || sections.length === 0}
                            className="flex-1 px-4 py-2.5 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            {isPending ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                'Assign Section'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default AssignSectionModal;