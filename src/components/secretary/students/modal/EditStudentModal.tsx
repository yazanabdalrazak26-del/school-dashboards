'use client';

import React, { useState, useEffect } from 'react';
import { MdClose, MdSave } from 'react-icons/md';
import { FaUserGraduate, FaEnvelope, FaLock, FaPhone, FaCalendar, FaMapMarkerAlt, FaTint, FaSchool, FaChevronDown, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import Input from '../../../ui/Input';
import { getErrorMessage } from '../../../../utils/utils';
import { useGrades } from '../../../../hooks/secretary/students/useStudents';
import type { GradeWithSections, Student, UpdateStudentRequest } from '../../../../type/secretary.type';
import { useUpdateStudent } from '../../../../hooks/secretary/students/useStudentsMutation';

interface EditStudentModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    student: Student | null;
    isLoading?: boolean;
}

function EditStudentModal({ isOpen, setIsOpen, student }: EditStudentModalProps) {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

    const { data: gradesData, isLoading: gradesLoading } = useGrades();
    const grades = gradesData as GradeWithSections[] | undefined;
    const { mutateAsync: editStudent, isPending } = useUpdateStudent();

    const [formData, setFormData] = useState<UpdateStudentRequest>({
        name: '',
        email: '',
        password: '',
        localGradeNumber: 0,
        localSectionNumber: 0,
        guardianName: '',
        guardianPhone: '',
        bloodType: 'Unknown',
        birthDate: '',
        address: ''
    });

    useEffect(() => {
        if (isOpen && student) {
            setFormData({
                name: student.name || '',
                email: student.email || '',
                password: '',
                localGradeNumber: student.gradeLocalNumber || 0,
                localSectionNumber: student.sectionLocalNumber || 0,
                guardianName: student.guardianName || '',
                guardianPhone: student.guardianPhone || '',
                bloodType: student.bloodType || 'Unknown',
                birthDate: student.birthDate ? student.birthDate.split('T')[0] : '',
                address: student.address || ''
            });
        }
    }, [isOpen, student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setFormData((prev) => ({
            ...prev,
            localGradeNumber: value,
            localSectionNumber: 0
        }));
    };

    const getSectionsForGrade = (gradeNumber: number) => {
        if (!gradeNumber || gradeNumber === 0) return [];
        const grade = grades?.find(g => g.localGradeNumber === gradeNumber);
        return grade?.sections || [];
    };

    const handleSave = async () => {
        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!formData.localGradeNumber) {
            toast.error("Please select a grade");
            return;
        }

        if (!formData.localSectionNumber) {
            toast.error("Please select a section");
            return;
        }

        if (!formData.guardianName.trim()) {
            toast.error("Guardian name is required");
            return;
        }

        if (!formData.guardianPhone.trim()) {
            toast.error("Guardian phone is required");
            return;
        }

        if (!formData.birthDate) {
            toast.error("Birth date is required");
            return;
        }

        try {
            await editStudent({ id: student?.id as number, data: formData });
            toast.success('Student updated successfully');
            setIsOpen(false);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const availableSections = getSectionsForGrade(formData.localGradeNumber);

    if (!isOpen) return null;

    if (!student) {
        return createPortal(
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-dark-blue-800">Edit Student</h2>
                            <p className="text-sm text-blue-gray-500 mt-1">Update student information</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="bg-red-50 rounded-full p-4 mb-4">
                            <FaUserGraduate className="text-red-500 text-4xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-dark-blue-800 mb-2">Student Not Found</h3>
                        <p className="text-blue-gray-500 text-sm text-center">
                            The student you're trying to edit could not be found.
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-lg sm:max-w-xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sm:mb-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Edit Student</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                        disabled={isPending}
                        aria-label="Close modal"
                    >
                        <MdClose className="text-xl sm:text-2xl" />
                    </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    <Input
                        title="Full Name"
                        placeholder="Enter student name"
                        icon={<FaUserGraduate className='text-dark-blue-700' />}
                        onChange={handleChange}
                        name="name"
                        value={formData.name}
                        required={true}
                        disabled={isPending}
                    />

                    <Input
                        title="Email"
                        placeholder="Enter email address"
                        icon={<FaEnvelope className='text-dark-blue-700' />}
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                        type="email"
                        required={true}
                        disabled={isPending}
                    />

                    <Input
                        title="Password (leave empty to keep current)"
                        placeholder="Enter new password"
                        icon={<FaLock className='text-dark-blue-700' />}
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                        type="password"
                        required={false}
                        disabled={isPending}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                Grade <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-blue-700">
                                    <FaSchool />
                                </span>
                                <select
                                    name="localGradeNumber"
                                    value={formData.localGradeNumber || ''}
                                    onChange={handleGradeChange}
                                    className="w-full px-4 py-2.5 sm:py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white appearance-none cursor-pointer hover:border-dark-blue-400"
                                    required
                                    disabled={gradesLoading || isPending}
                                >
                                    <option value="">Select grade</option>
                                    {grades?.map((grade) => (
                                        <option key={grade.localGradeNumber} value={grade.localGradeNumber}>
                                            {grade.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <FaChevronDown className="text-lg" />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                Section <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-blue-700">
                                    <FaSchool />
                                </span>
                                <select
                                    name="localSectionNumber"
                                    value={formData.localSectionNumber || ''}
                                    onChange={handleSelectChange}
                                    className="w-full px-4 py-2.5 sm:py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white appearance-none cursor-pointer hover:border-dark-blue-400"
                                    required
                                    disabled={!formData.localGradeNumber || availableSections.length === 0 || isPending}
                                >
                                    <option value="">Select section</option>
                                    {availableSections.map((section) => (
                                        <option key={section.localSectionNumber} value={section.localSectionNumber}>
                                            {section.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <FaChevronDown className="text-lg" />
                                </span>
                            </div>
                            {formData.localGradeNumber && availableSections.length === 0 && (
                                <p className="text-xs text-yellow-500 mt-1.5">No sections available for this grade</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            title="Guardian Name"
                            placeholder="Enter guardian name"
                            icon={<FaUserGraduate className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="guardianName"
                            value={formData.guardianName}
                            required={true}
                            disabled={isPending}
                        />

                        <Input
                            title="Guardian Phone"
                            placeholder="Enter guardian phone"
                            icon={<FaPhone className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="guardianPhone"
                            value={formData.guardianPhone}
                            type="tel"
                            required={true}
                            disabled={isPending}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                Blood Type
                            </label>
                            <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleSelectChange}
                                disabled={isPending}
                                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
                            >
                                {bloodTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            title="Birth Date"
                            placeholder="Select birth date"
                            icon={<FaCalendar className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="birthDate"
                            value={formData.birthDate}
                            type="date"
                            required={true}
                            disabled={isPending}
                        />
                    </div>

                    <Input
                        title="Address"
                        placeholder="Enter student address"
                        icon={<FaMapMarkerAlt className='text-dark-blue-700' />}
                        onChange={handleChange}
                        name="address"
                        value={formData.address}
                        required={true}
                        disabled={isPending}
                    />

                    <div className='flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4'>
                        <button
                            type='button'
                            onClick={() => setIsOpen(false)}
                            disabled={isPending}
                            className='w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base font-medium'
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            onClick={handleSave}
                            disabled={isPending}
                            className='w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base font-medium'
                        >
                            {isPending ? (
                                'Saving...'
                            ) : (
                                <span className='flex items-center gap-2'><MdSave className='text-lg sm:text-xl' /> Save Changes</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default EditStudentModal;