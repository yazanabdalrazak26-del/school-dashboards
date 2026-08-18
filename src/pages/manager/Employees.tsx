import { FaUsers, FaSpinner } from 'react-icons/fa';
import EmployeeCard from '../../components/manager/employees/cards/EmployeeCard';
import { useEmployees } from '../../hooks/manager/employees/useEmployees';




function Employees() {
  const {data: employees , isLoading} = useEmployees();
  
  

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-dark-blue-700 text-5xl mb-4" />
        <p className="text-blue-gray-500 text-sm">Loading employees...</p>
      </div>
    );
  }

  const roleStats = employees?.reduce((acc: any, emp) => {
    acc[emp.roleName] = (acc[emp.roleName] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaUsers className="text-dark-blue-700" />
            Employees
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Manage employee records • {employees?.length || 0} employees
          </p>
        </div>
      </div>

      {!employees || employees.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-gray-50 rounded-full p-6">
              <FaUsers className="text-5xl text-blue-gray-300" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-dark-blue-800 mb-2">No Employees Found</h3>
          <p className="text-blue-gray-500 text-sm">
            There are no employees available in the system yet.
          </p>
          <p className="text-blue-gray-400 text-xs mt-1">
            Employees will appear here once they are added.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">
                      National ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-gray-100">
                  {employees.map((employee) => (
                    <EmployeeCard key={employee.employeeId} employee={employee} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
              <p className="text-sm text-blue-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-dark-blue-800">{employees.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
              <p className="text-sm text-blue-gray-500">Active Employees</p>
              <p className="text-2xl font-bold text-green-600">
                {employees.filter((e) => e.isActive).length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
              <p className="text-sm text-blue-gray-500">Inactive Employees</p>
              <p className="text-2xl font-bold text-red-600">
                {employees.filter((e) => !e.isActive).length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
              <p className="text-sm text-blue-gray-500">Different Roles</p>
              <p className="text-2xl font-bold text-purple-600">
                {Object.keys(roleStats).length}
              </p>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4 mt-4">
            <p className="text-sm font-semibold text-dark-blue-700 mb-3">Role Distribution</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(roleStats).map(([role, count]) => (
                <div key={role} className="bg-blue-gray-50 px-3 py-1.5 rounded-full">
                  <span className="text-sm text-dark-blue-700">
                    {role}: <span className="font-bold">{count as number}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Employees;