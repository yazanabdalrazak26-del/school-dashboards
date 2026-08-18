import { FaTimes, FaUserGraduate, FaEnvelope, FaLock, FaPhone, FaCalendar, FaMapMarkerAlt, FaTint, FaSchool, FaChevronDown } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../../ui/Input';
import { getErrorMessage } from '../../../../utils/utils';
import { useGrades } from '../../../../hooks/secretary/students/useStudents';
import type { GradeWithSections, AddStudentPayload } from '../../../../type/secretary.type';
import { useCreateStudent } from '../../../../hooks/secretary/students/useStudentsMutation';

type AddStudentModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

function AddStudentModal({ isOpen, setIsOpen }: AddStudentModalProps) {
    if (!isOpen) return null;

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

    const { data: gradesData, isLoading: gradesLoading } = useGrades();
    const grades = gradesData as GradeWithSections[] | undefined;
    const { mutateAsync: addStudent, isPending: isLoading } = useCreateStudent();
    
    const [formData, setFormData] = useState<AddStudentPayload>({
        name: '',
        email: '',
        password: '',
        localGradeNumber: 0,
        localSectionNumber: 0,
        guardianName: '',
        guardianPhone: '',
        bloodType: 'Unknown',
        chronicDiseases: '',
        allergies: '',
        healthNotes: '',
        birthDate: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
        if (name === 'localSectionNumber') {
            setFormData((prev) => ({ 
                ...prev, 
                [name]: parseInt(value) || 0 
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Name is required');
            return;
        }

        if (!formData.email.trim()) {
            toast.error('Email is required');
            return;
        }

        if (!formData.password.trim()) {
            toast.error('Password is required');
            return;
        }

        if (!formData.localGradeNumber) {
            toast.error('Please select a grade');
            return;
        }

        if (!formData.localSectionNumber) {
            toast.error('Please select a section');
            return;
        }

        if (!formData.guardianName.trim()) {
            toast.error('Guardian name is required');
            return;
        }

        if (!formData.guardianPhone.trim()) {
            toast.error('Guardian phone is required');
            return;
        }

        if (!formData.birthDate) {
            toast.error('Birth date is required');
            return;
        }

        try {
            await addStudent(formData);
            toast.success('Student added successfully');
            setIsOpen(false);
            setFormData({
                name: '',
                email: '',
                password: '',
                localGradeNumber: 0,
                localSectionNumber: 0,
                guardianName: '',
                guardianPhone: '',
                bloodType: 'Unknown',
                chronicDiseases: '',
                allergies: '',
                healthNotes: '',
                birthDate: '',
                address: ''
            });
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const availableSections = getSectionsForGrade(formData.localGradeNumber);

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <section className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-50 w-full max-w-xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
                    <header className='mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100 relative'>
                        <div className='absolute left-0 top-0 w-1 h-12 sm:h-14 bg-dark-blue-600 rounded-full'></div>
                        <div className="flex justify-between items-center">
                            <h3 className='text-xl sm:text-2xl flex items-center gap-3 text-dark-blue-800 font-semibold pl-3'>
                                <MdOutlineEdit className='text-2xl sm:text-3xl text-dark-blue-600 flex-shrink-0' />
                                <span className='text-lg sm:text-xl'>Add New Student</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="text-xl sm:text-2xl" />
                            </button>
                        </div>
                        <p className='text-sm sm:text-base text-gray-500 mt-1 ml-3 sm:ml-12'>
                            Fill in the details below to create a new student
                        </p>
                    </header>

                    <div className='rounded-lg flex flex-col gap-4 sm:gap-5'>
                        <Input
                            title="Full Name"
                            placeholder="Enter student name"
                            icon={<FaUserGraduate className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="name"
                            value={formData.name}
                            required={true}
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
                        />

                        <Input
                            title="Password"
                            placeholder="Enter password"
                            icon={<FaLock className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                            type="password"
                            required={true}
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
                                        className="w-full px-4 py-2.5 sm:py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white appearance-none cursor-pointer hover:border-dark-blue-400"
                                        required
                                        disabled={gradesLoading}
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
                                {gradesLoading && (
                                    <p className="text-xs text-blue-gray-400 mt-1.5">Loading grades...</p>
                                )}
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
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 sm:py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white appearance-none cursor-pointer hover:border-dark-blue-400"
                                        required
                                        disabled={!formData.localGradeNumber || availableSections.length === 0}
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
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white"
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
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                title="Chronic Diseases"
                                placeholder="Enter chronic diseases"
                                icon={<FaTint className='text-dark-blue-700' />}
                                onChange={handleChange}
                                name="chronicDiseases"
                                value={formData.chronicDiseases}
                                required={false}
                            />

                            <Input
                                title="Allergies"
                                placeholder="Enter allergies"
                                icon={<FaTint className='text-dark-blue-700' />}
                                onChange={handleChange}
                                name="allergies"
                                value={formData.allergies}
                                required={false}
                            />
                        </div>

                        <Input
                            title="Health Notes"
                            placeholder="Enter health notes"
                            icon={<FaTint className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="healthNotes"
                            value={formData.healthNotes}
                            required={false}
                        />

                        <Input
                            title="Address"
                            placeholder="Enter student address"
                            icon={<FaMapMarkerAlt className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="address"
                            value={formData.address}
                            required={true}
                        />
                    </div>

                    <>
                        <hr className='border-0 h-px bg-gray-400 mt-3 w-[90%] self-center' />
                        <div className='flex xs:flex-row items-center gap-3 sm:gap-4 mt-3'>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className='
                                    w-full xs:flex-1 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg 
                                    bg-dark-blue-600 text-white 
                                    shadow-md hover:shadow-lg 
                                    transition-all duration-200 
                                    transform hover:-translate-y-0.5
                                    hover:bg-dark-blue-700
                                    flex items-center justify-center gap-2
                                    cursor-pointer
                                    text-sm sm:text-base font-medium
                                    order-2 xs:order-1
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                '
                            >
                                <FaUserGraduate className="text-sm" />
                                {isLoading ? 'Adding...' : "Add Student"}
                            </button>

                            <button
                                type="button"
                                className='
                                    w-full xs:flex-1 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg 
                                    border border-gray-300 
                                    text-gray-600 bg-white 
                                    hover:bg-gray-50 hover:border-gray-400 
                                    transition-all duration-200
                                    cursor-pointer
                                    text-sm sm:text-base font-medium
                                    order-1 xs:order-2
                                '
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                </form>
            </section>
        </div>,
        document.body
    );
}

export default AddStudentModal;