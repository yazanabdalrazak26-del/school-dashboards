import React, { useState, useEffect } from 'react';
import { FaTimes, FaExchangeAlt, FaSpinner } from 'react-icons/fa';
import { useSchools } from '../../../../hooks/admin/school/useSchool';
// import { useTransferStudent } from '../../../../hooks/admin/transfer/useTransfer';
import { toast } from 'react-toastify';
import type { Student } from '../../../../type/Student.type';
import type { School, Grade, Section } from '../../../../type/school.type';
import { useTransferStudent } from '../../../../hooks/admin/transfer/useTransferMutation';
import { getErrorMessage } from '../../../../utils/utils';

type TransferStudentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    school: School;
}

function TransferStudentModal({ isOpen, onClose, student, school }: TransferStudentModalProps) {
    const { data: schools, isLoading: schoolsLoading } = useSchools();
    
    const { mutateAsync: transferStudent, isPending } = useTransferStudent();

    
    const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
    const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);

    const selectedSchool = schools?.find(s => s.id === selectedSchoolId);
    const grades = selectedSchool?.grades || [];

    const getSectionsForGrade = (gradeId: number) => {
        const grade = grades.find(g => g.id === gradeId);
        return grade?.sections || [];
    };

    const sections = selectedGradeId ? getSectionsForGrade(selectedGradeId) : [];

    useEffect(() => {
        if (!isOpen) {
            setSelectedSchoolId(null);
            setSelectedGradeId(null);
            setSelectedSectionId(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const availableSchools = schools?.filter(s => s.id !== school.id) || [];

    const handleSchoolChange = (schoolId: number) => {
        setSelectedSchoolId(schoolId);
        setSelectedGradeId(null);
        setSelectedSectionId(null);
    };

    const handleGradeChange = (gradeId: number) => {
        setSelectedGradeId(gradeId);
        setSelectedSectionId(null);
    };

    const handleTransfer = async () => {
        if (!selectedSchoolId) {
            toast.error('Please select a school');
            return;
        }

        if (!selectedGradeId) {
            toast.error('Please select a grade');
            return;
        }

        if (!selectedSectionId) {
            toast.error('Please select a section');
            return;
        }

        const selectedGrade = grades.find(g => g.id === selectedGradeId);
        const selectedSection = sections.find(s => s.id === selectedSectionId);

        try {
            await transferStudent({
                studentId: student.id,
                newSchoolId: selectedSchoolId,
                localGradeNumber: selectedGrade?.localGradeNumber || 1,
                localSectionNumber: selectedSection?.localSectionNumber || 1
            });
            
            toast.success(`${student.name} transferred successfully`);
            onClose();
            
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm m-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-dark-blue-100 rounded-full p-2.5">
                            <FaExchangeAlt className="text-dark-blue-700 text-xl" />
                        </div>
                        <h3 className="text-xl font-bold text-dark-blue-800">Transfer Student</h3>
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
                    <p className="text-xs text-blue-gray-500 uppercase tracking-wider font-medium">Student</p>
                    <p className="text-lg font-semibold text-dark-blue-800">{student.name}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-blue-gray-600">
                        <span>#{student.localStudentNumber}</span>
                        <span>•</span>
                        <span>{student.gradeName}</span>
                        <span>•</span>
                        <span>{student.sectionName}</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-gray-400">
                        Current School: {school.name}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                            Transfer to School <span className="text-red-500">*</span>
                        </label>
                        {schoolsLoading ? (
                            <div className="flex items-center justify-center py-3">
                                <FaSpinner className="animate-spin text-dark-blue-700 text-xl" />
                            </div>
                        ) : availableSchools.length === 0 ? (
                            <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                No other schools available
                            </div>
                        ) : (
                            <select
                                value={selectedSchoolId || ''}
                                onChange={(e) => handleSchoolChange(Number(e.target.value))}
                                className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
                                disabled={isPending}
                            >
                                <option value="">Select a school</option>
                                {availableSchools.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    {selectedSchoolId && (
                        <div>
                            <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                                Grade <span className="text-red-500">*</span>
                            </label>
                            {grades.length === 0 ? (
                                <div className="text-sm text-blue-gray-500 bg-blue-gray-50 p-3 rounded-lg text-center">
                                    No grades available in this school
                                </div>
                            ) : (
                                <select
                                    value={selectedGradeId || ''}
                                    onChange={(e) => handleGradeChange(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
                                    disabled={isPending}
                                >
                                    <option value="">Select a grade</option>
                                    {grades.map((grade: Grade) => (
                                        <option key={grade.id} value={grade.id}>
                                            {grade.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}


                    {selectedGradeId && (
                        <div>
                            <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
                                Section <span className="text-red-500">*</span>
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
                                >
                                    <option value="">Select a section</option>
                                    {sections.map((section: Section) => (
                                        <option key={section.id} value={section.id}>
                                            {section.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-blue-gray-100">
                    <button
                        onClick={onClose}
                        disabled={isPending}
                        className="flex-1 px-4 py-2.5 border border-blue-gray-200 rounded-lg text-dark-blue-700 hover:bg-blue-gray-50 transition-colors text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleTransfer}
                        disabled={isPending || !selectedSchoolId || !selectedGradeId || !selectedSectionId || availableSchools.length === 0}
                        className="flex-1 px-4 py-2.5 bg-dark-blue-700 text-white rounded-lg hover:bg-dark-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        {isPending ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Transferring...
                            </>
                        ) : (
                            'Transfer Student'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransferStudentModal;