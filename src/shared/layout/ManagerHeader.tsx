import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ManagerHeader() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getInitials = (name: string) => {
    if (!name) return 'MN';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="bg-white border-b border-blue-gray-100 px-4 lg:px-6 xl:px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-dark-blue-800">Manager Dashboard</h2>
          <p className="text-sm text-blue-gray-500">Welcome back, {user?.name || 'Manager'}!</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
          
          <div className="sm:mr-15 lg:mr-0 xl:mr-0 flex items-center gap-3 px-3 py-2 hover:bg-blue-gray-50 rounded-xl transition-colors">
            <div className="w-9 h-9 rounded-full bg-dark-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{getInitials(user?.name)}</span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-dark-blue-800">{user?.name || 'Manager'}</p>
              <p className="text-xs text-blue-gray-500">{user?.role || 'Manager'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ManagerHeader;