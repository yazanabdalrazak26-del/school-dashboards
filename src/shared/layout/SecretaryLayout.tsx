import { Outlet } from 'react-router-dom';
import SecretaryHeader from './SecretaryHeader';
import Sidebar from '../Sidebar/Sidebar';
import { FaHome, FaBullhorn, FaUserGraduate } from 'react-icons/fa';

function SecretaryLayout() {
    const menuItem = [
        { title: 'Dashboard', path: '/secretary', icon: <FaHome /> },
        { title: 'Announcements', path: '/secretary/announcements', icon: <FaBullhorn /> },
        { title: 'Students', path: '/secretary/students', icon: <FaUserGraduate /> },
    ];

    return (
        <div className="flex h-screen bg-blue-gray-50 overflow-hidden">
            <Sidebar menuItem={menuItem} title='Secretary Panel' />
            <div className="flex-1 flex flex-col overflow-hidden">
                <SecretaryHeader />
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8 bg-blue-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SecretaryLayout;