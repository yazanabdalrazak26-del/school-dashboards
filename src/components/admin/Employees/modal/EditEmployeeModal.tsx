import { FaTimes, FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt, FaCalendar, FaGraduationCap, FaSchool, FaLock } from 'react-icons/fa';
import Input from '../../../ui/Input';
import { useState } from 'react';
import type { SchoolEmployee } from '../../../../type/Employee.type';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { useUpdateEmployee } from '../../../../hooks/admin/employee/useEmployeeMutation';

type EditEmployeeModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    employee: SchoolEmployee;
    schoolId: number;
    onSuccess?: () => void;
}

const ROLES = ["Principal", "Secretary", "Counselor", "Librarian", "ActivitySupervisor", "Teacher"];

function EditEmployeeModal({ isOpen, setIsOpen, employee, schoolId, onSuccess }: EditEmployeeModalProps) {

    const [data, setData] = useState({
        name: employee.name || '',
        email: employee.email || '',
        nationalId: employee.nationalId || '',
        phone: employee.phone || '',
        address: employee.address || '',
        birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
        role: employee.role || 'Teacher',
        password: '',
    });

    const {mutateAsync: updateEmployee  , isPending: isLoading} = useUpdateEmployee();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data.name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!data.email.trim()) {
            toast.error('Email is required');
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


        try {
            const updatePayload: any = {
                name: data.name,
                email: data.email,
                nationalId: data.nationalId,
                phone: data.phone,
                address: data.address,
                birthDate: data.birthDate,
                role: data.role,
                schoolId: schoolId,
            };

            if (data.password && data.password.trim()) {
                updatePayload.password = data.password;
            }

            await updateEmployee({empId: employee.localEmployeeNumber , schoolId: schoolId , data: updatePayload})
            toast.success('Employee updated successfully');

            if (onSuccess) onSuccess();
        } catch (error: any) {
            toast.error(getErrorMessage(error));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark-blue-800">Edit Employee</h2>
                        <p className="text-sm text-blue-gray-500 mt-1">Update employee information</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="bg-blue-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-dark-blue-700 mb-4 flex items-center gap-2">
                            <FaUser className="text-dark-blue-600" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                title="Full Name"
                                placeholder={employee.name || "Enter full name"}
                                icon={<FaUser className="text-gray-400" />}
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                title="Email"
                                placeholder={employee.email || "Enter email address"}
                                icon={<FaEnvelope className="text-gray-400" />}
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                title="National ID"
                                placeholder={employee.nationalId || "Enter national ID"}
                                icon={<FaIdCard className="text-gray-400" />}
                                name="nationalId"
                                value={data.nationalId}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                title="Birth Date"
                                placeholder="Select birth date"
                                icon={<FaCalendar className="text-gray-400" />}
                                type="date"
                                name="birthDate"
                                value={data.birthDate}
                                onChange={handleChange}
                                required={false}
                            />
                            
                        </div>
                    </div>

                    <div className="bg-blue-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-dark-blue-700 mb-4 flex items-center gap-2">
                            <FaPhone className="text-dark-blue-600" />
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                title="Phone Number"
                                placeholder={employee.phone || "Enter phone number"}
                                icon={<FaPhone className="text-gray-400" />}
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                title="Address"
                                placeholder={employee.address || "Enter address"}
                                icon={<FaMapMarkerAlt className="text-gray-400" />}
                                name="address"
                                value={data.address}
                                onChange={handleChange}
                                required={false}
                            />
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
                            </div>
                            <Input
                                title="New Password"
                                placeholder="new password (optional)"
                                icon={<FaLock className="text-gray-400" />}
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required={false}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-blue-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-lg disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 text-white bg-dark-blue-700 rounded-lg hover:bg-dark-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium text-lg disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployeeModal;