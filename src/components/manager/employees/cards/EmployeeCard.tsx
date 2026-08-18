import { FiMail, FiCalendar, FiClock } from "react-icons/fi";
import { useEmployeeAttendance } from "../../../../hooks/manager/employees/useEmployeeMutations";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../../utils/utils";
import type { SchoolEmployee } from "../../../../type/Employee.type";

function EmployeeCard ({ employee }: { employee: SchoolEmployee }) {

    const {mutateAsync: addAttendence , isPending} = useEmployeeAttendance();

    const handleAttendance = async () =>{
        try{

            if(!employee.localEmployeeNumber || isNaN(employee.localEmployeeNumber)){
                toast.error('the employee not found');
            }

            const formattedDate = new Date().toISOString().split('T')[0];
            const response = await addAttendence({
                date: formattedDate,
                entries:[
                    {
                        localEmployeeNumber: employee.localEmployeeNumber,
                        status: 'Present',
                    }
                ]
            })

            toast.success(response.message);

        }catch(error: any){ 
            toast.error(getErrorMessage(error))
        }

    }
  return (
    <tr className="hover:bg-blue-gray-50/50 transition-colors duration-200">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-dark-blue-100 flex items-center justify-center">
            <span className="text-dark-blue-700 font-semibold text-sm">
              {employee.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-dark-blue-800 text-sm">{employee.name}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <FiMail className="text-blue-gray-400" size={14} />
          <span className="text-sm text-blue-gray-700">{employee.email}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-blue-gray-700">{employee.roleName}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-blue-gray-700">{employee.nationalId || 'N/A'}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
          employee.isActive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            employee.isActive ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          {employee.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-blue-gray-400" size={14} />
          <span className="text-sm text-blue-gray-600">
            {new Date(employee.createdAt).toLocaleDateString('en-US')}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-blue-600 hover:bg-dark-blue-700 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
          onClick={handleAttendance}
          disabled={isPending}
        >
          <FiClock size={14} />
          {isPending ? 'Saving...' : 'Attendance'}
        </button>
      </td>
    </tr>
  );
};

export default EmployeeCard