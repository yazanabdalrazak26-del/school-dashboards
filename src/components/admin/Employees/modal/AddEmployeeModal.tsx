import { FaTimes, FaUser, FaEnvelope, FaLock, FaIdCard, FaPhone, FaMapMarkerAlt, FaCalendar, FaGraduationCap, FaSchool } from 'react-icons/fa';
import Input from '../../../ui/Input';
import { useState } from 'react';
import type { CreateEmployeePayload } from '../../../../type/Employee.type';
import { toast } from 'react-toastify';
import { useAddEmployee } from '../../../../hooks/admin/employee/useEmployeeMutation';
import { getErrorMessage } from '../../../../utils/utils';

type AddEmployeeModalProps = {
    isOpen: boolean;
    schoolId: number;
    setIsOpen: (value: boolean) => void;
}

const ROLES = ["Principal", "Secretary", "Counselor", "Librarian", "ActivitySupervisor", "Teacher"];

function AddEmployeeModal({ isOpen, setIsOpen, schoolId }: AddEmployeeModalProps) {

    if (!isOpen) return null;

    const { mutateAsync: addEmployee, isPending } = useAddEmployee();

    const [data, setData] = useState<CreateEmployeePayload>({
        name: '',
        email: '',
        password: '',
        role: 'Teacher',
        nationalId: '',
        schoolId: schoolId,
        phone: '',
        address: '',
        birthDate: '',
        qualification: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        if (!data.name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!data.email.trim()) {
            toast.error('Email is required');
            return;
        }
        if (!data.password.trim()) {
            toast.error('Password is required');
            return;
        }
        if (!data.nationalId.trim()) {
            toast.error('National ID is required');
            return;
        }
        if (!data.phone.trim()) {
            toast.error('Phone number is required');
            return;
        }
        if (!data.birthDate) {
            toast.error('Birth date is required');
            return;
        }

        try {
            await addEmployee(data);
            toast.success('Employee added successfully');
            setIsOpen(false);
            setData({
                name: '',
                email: '',
                password: '',
                role: 'Teacher',
                nationalId: '',
                schoolId: schoolId,
                phone: '',
                address: '',
                birthDate: '',
                qualification: '',
            });
        } catch (error: any) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark-blue-800">Add New Employee</h2>
                        <p className="text-sm text-blue-gray-500 mt-1">Fill in the details below to create a new employee</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="bg-blue-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-dark-blue-700 mb-4 flex items-center gap-2">
                            <FaUser className="text-dark-blue-600" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    title="Full Name"
                                    placeholder="Enter full name"
                                    icon={<FaUser className="text-gray-400" />}
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    title="Email"
                                    placeholder="Enter email address"
                                    icon={<FaEnvelope className="text-gray-400" />}
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    title="Password"
                                    placeholder="Enter password"
                                    icon={<FaLock className="text-gray-400" />}
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    title="National ID"
                                    placeholder="Enter national ID"
                                    icon={<FaIdCard className="text-gray-400" />}
                                    name="nationalId"
                                    value={data.nationalId}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.nationalId && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nationalId}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-dark-blue-700 mb-4 flex items-center gap-2">
                            <FaPhone className="text-dark-blue-600" />
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    title="Phone Number"
                                    placeholder="Enter phone number"
                                    icon={<FaPhone className="text-gray-400" />}
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    title="Address"
                                    placeholder="Enter address"
                                    icon={<FaMapMarkerAlt className="text-gray-400" />}
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    required={false}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    title="Birth Date"
                                    placeholder="Select birth date"
                                    icon={<FaCalendar className="text-gray-400" />}
                                    type="date"
                                    name="birthDate"
                                    value={data.birthDate}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.birthDate && (
                                    <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    title="Qualification"
                                    placeholder="Enter qualification"
                                    icon={<FaGraduationCap className="text-gray-400" />}
                                    name="qualification"
                                    value={data.qualification}
                                    onChange={handleChange}
                                    required={false}
                                />
                                {errors.qualification && (
                                    <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-dark-blue-700 mb-4 flex items-center gap-2">
                            <FaSchool className="text-dark-blue-600" />
                            Work Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm sm:text-base font-medium text-gray-700 mb-1.5 block">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="role"
                                    value={data.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white"
                                >
                                    {ROLES.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-blue-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isPending}
                            className="w-full sm:w-auto px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full sm:w-auto px-6 py-2.5 text-white bg-dark-blue-700 rounded-lg hover:bg-dark-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium disabled:opacity-50"
                        >
                            {isPending ? 'Adding...' : "Add Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployeeModal;