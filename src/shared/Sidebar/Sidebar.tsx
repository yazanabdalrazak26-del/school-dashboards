
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, type ReactNode } from 'react';
import { 
  FaSchool, 
  FaBars,
  FaTimes
} from 'react-icons/fa';

type MenuItem = {
    title: string;
    path: string;
    icon: ReactNode;
};

type SidebarProps = {
    menuItem: MenuItem[];
    title?: string
}

function Sidebar({menuItem , title}: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-4 z-50 p-2 bg-dark-blue-700 text-white rounded-lg shadow-lg hover:bg-dark-blue-600 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-40
          bg-white text-dark-blue-800 w-64 h-screen shadow-xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className='p-4 lg:p-3 xl:p-4 mb-1 flex items-center gap-2.5 border-b border-blue-gray-100 flex-shrink-0'>
          <div className='bg-dark-blue-700 p-1.5 rounded-lg flex-shrink-0'>
            <FaSchool className='text-white text-xl lg:text-lg xl:text-xl' />
          </div>
          <div className='min-w-0'>
            <h1 className='text-dark-blue-800 text-base lg:text-sm xl:text-lg font-bold truncate'>{title}</h1>
            <p className='text-blue-gray-500 text-[10px] lg:text-[10px] xl:text-xs mt-0.5 truncate'>School Management</p>
          </div>
        </div>

        <nav className='flex-1 p-3 lg:p-2.5 xl:p-3 overflow-hidden'>
          <div className='space-y-1 flex flex-col gap-1.5'>
            {menuItem.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/manager' || item.path === '/admin' || item.path === '/secretary'}
                className={({ isActive }) => `
                  flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-dark-blue-700 text-white shadow-md shadow-dark-blue-700/20' 
                    : 'text-blue-gray-600 hover:bg-blue-gray-50 hover:text-dark-blue-800'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;