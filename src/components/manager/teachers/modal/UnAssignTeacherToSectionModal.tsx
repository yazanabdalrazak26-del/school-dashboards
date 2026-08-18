import React, { useState, useEffect } from 'react';
import { FaTimes, FaUsers, FaSpinner, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { createPortal } from 'react-dom';
import type { Teacher, UnAssignData } from '../../../../type/manager.type';
import { useGrade } from '../../../../hooks/manager/grades/useGrades';
import { useUnAssignSection } from '../../../../hooks/manager/teachers/useTeacherMutations';

type UnassignSectionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher;
}

function UnassignSectionModal({ isOpen, onClose, teacher }: UnassignSectionModalProps) {
    const { data: grades, isLoading: gradesLoading } = useGrade();
    const { mutateAsync: unassignSection, isPending } = useUnAssignSection();
    
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
    const [selectedGradeNumber, setSelectedGradeNumber] = useState<number | null>(null);

    const assignedSubjects = teacher.subjects || [];
    const assignedSections = teacher.sections || [];

    const uniqueAssignedSubjects = assignedSubjects.filter(
        (subject, index, self) => 
            index === self.findIndex(s => s.subjectId === subject.subjectId)
    );

    const uniqueAssignedSections = assignedSections.filter(
        (section, index, self) => 
            index === self.findIndex(s => s.localSectionNumber === section.localSectionNumber)
    );

    const teacherGrades = grades?.filter((grade: any) =>
        uniqueAssignedSections.some(s => s.localGradeNumber === grade.localGradeNumber)
    ) || [];

    const getTeacherSectionsForGrade = () => {
        if (!selectedGradeNumber) return [];
        return uniqueAssignedSections.filter(
            section => section.localGradeNumber === selectedGradeNumber
        );
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectedSubjectId(null);
            setSelectedSectionId(null);
            setSelectedGradeNumber(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const sectionsForGrade = getTeacherSectionsForGrade();

    const handleGradeChange = (localGradeNumber: number) => {
        setSelectedGradeNumber(localGradeNumber);
        setSelectedSectionId(null);
        setSelectedSubjectId(null);
    };

    const handleSectionChange = (localSectionNumber: number) => {
        setSelectedSectionId(localSectionNumber);
        setSelectedSubjectId(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            const payload: UnAssignData = {
                teacherLocalNumber: teacher.localEmployeeNumber,
                localGradeNumber: selectedGradeNumber,
                localSubjectId: selectedSubjectId,
                localSectionNumber: selectedSectionId
            };

            await unassignSection(payload);
            
            toast.success('Section unassigned successfully');
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
                        <div className="bg-red-100 rounded-full p-2.5">
                            <FaTrash className="text-red-700 text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-dark-blue-800">Unassign Section</h3>
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
                    <div className="mt-2 flex flex-wrap gap-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {uniqueAssignedSubjects.length} Subjects
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            {uniqueAssignedSections.length} Sections
                        </span>
                    </div>
                </div>

                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4 flex items-center gap-2">
                    <FaTrash className="text-sm" />
                    This will remove the teacher from the selected section
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                            Select Grade <span className="text-red-500">*</span>
                        </label>
                        {gradesLoading ? (
                            <div className="flex items-center justify-center py-3">
                                <FaSpinner className="animate-spin text-dark-blue-700 text-xl" />
                            </div>
                        ) : teacherGrades.length === 0 ? (
                            <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                No assigned grades found for this teacher
                            </div>
                        ) : (
                            <select
                                value={selectedGradeNumber || ''}
                                onChange={(e) => handleGradeChange(Number(e.target.value))}
                                className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-dark-blue-800 text-sm"
                                disabled={isPending}
                                required
                            >
                                <option value="">Select a grade</option>
                                {teacherGrades.map((grade: any) => (
                                    <option key={grade.localGradeNumber} value={grade.localGradeNumber}>
                                        {grade.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Section Select - using localSectionNumber */}
                    {selectedGradeNumber && (
                        <div>
                            <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                                Select Section <span className="text-red-500">*</span>
                            </label>
                            {sectionsForGrade.length === 0 ? (
                                <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                    No assigned sections found for this grade
                                </div>
                            ) : (
                                <select
                                    value={selectedSectionId || ''}
                                    onChange={(e) => handleSectionChange(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-dark-blue-800 text-sm"
                                    disabled={isPending}
                                    required
                                >
                                    <option value="">Select a section</option>
                                    {sectionsForGrade.map((section: any) => (
                                        <option key={section.localSectionNumber} value={section.localSectionNumber}>
                                            {section.sectionName}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

                    {selectedSectionId && (
                        <div>
                            <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                                Select Subject <span className="text-red-500">*</span>
                            </label>
                            {uniqueAssignedSubjects.length === 0 ? (
                                <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                    No assigned subjects found for this teacher
                                </div>
                            ) : (
                                <select
                                    value={selectedSubjectId || ''}
                                    onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-dark-blue-800 text-sm"
                                    disabled={isPending}
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    {uniqueAssignedSubjects.map((subject: any) => (
                                        <option key={subject.localSubjectId || subject.subjectId} 
                                                value={subject.localSubjectId || subject.subjectId}>
                                            {subject.subjectName}
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
                            disabled={isPending || !selectedSubjectId || !selectedSectionId || !selectedGradeNumber}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            {isPending ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Unassigning...
                                </>
                            ) : (
                                <>
                                    <FaTrash className="text-sm" />
                                    Unassign Section
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default UnassignSectionModal;