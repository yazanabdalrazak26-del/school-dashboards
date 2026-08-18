import { Outlet } from 'react-router-dom';

import ManagerHeader from './ManagerHeader';
import { FaHome, FaBook, FaClipboardList, FaChalkboardTeacher, FaFileAlt, FaGraduationCap } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import { FaPerson } from 'react-icons/fa6';


function ManagerLayout() {
    const menuItem = [
        { title: 'Dashboard', path: '/manager', icon: <FaHome /> },
        { title: 'Grades', path: '/manager/grades', icon: <FaBook /> },
        { title: 'Subjects', path: '/manager/subjects', icon: <FaClipboardList /> },
        { title: 'Teachers', path: '/manager/teachers', icon: <FaChalkboardTeacher /> },
        // { title: 'Students', path: '/manager/students', icon: <FaUserGraduate /> },
        { title: 'Employees', path: '/manager/employees', icon: <FaPerson /> },
        { title: 'Management', path: '/manager/management', icon: <FaFileAlt /> },
        { title: 'Promote', path: '/manager/promote', icon: <FaGraduationCap /> },
        // { title: 'Settings', path: '/manager/settings', icon: <FaCog /> },
    ];

  return (
    <div className="flex h-screen bg-blue-gray-50 overflow-hidden">
      <Sidebar menuItem={menuItem} title='Manager Panel'/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ManagerHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8 bg-blue-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManagerLayout;