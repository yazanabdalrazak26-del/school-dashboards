import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from '../Sidebar/Sidebar';
import { FaHome, FaBuilding, FaUserTie, FaExchangeAlt } from 'react-icons/fa';


function Layout() {
    const menuItem = [
    { title: 'Dashboard', path: '/admin', icon: <FaHome /> },
    { title: 'Schools', path: '/admin/schools', icon: <FaBuilding /> },
    { title: 'Employees', path: '/admin/employees', icon: <FaUserTie /> },
    { title: 'Transfers', path: '/admin/transfers', icon: <FaExchangeAlt /> },
  ];
  return (
    <div className="flex h-screen bg-blue-gray-50 overflow-hidden">
      <Sidebar menuItem={menuItem} title='Admin Panel'/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8 bg-blue-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;