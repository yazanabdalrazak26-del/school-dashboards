import { FaFileAlt } from 'react-icons/fa';
import { FiClock, FiUsers, FiPlus, FiUser} from 'react-icons/fi';
import { useState } from 'react';
import { ImageUploadModal } from '../../components/manager/management/modal/ImageUploadModal';
import { useTeachers } from '../../hooks/manager/teachers/useTeachers';
import TeacherCard from '../../components/manager/management/cards/TeacherCard';
import { useSections } from '../../hooks/manager/sections/useSection';
import SectionCard from '../../components/manager/management/cards/SectionCard';
import { useAllAttendence } from '../../hooks/manager/employees/useEmployees';
import AttendenceCard from '../../components/manager/management/cards/AttendenceCard';

const Management = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<{ id: number; name: string; type: 'teacher' | 'section' } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: teachers, isLoading } = useTeachers();
  const { data: sections, isLoading: isLoadingSections } = useSections();
  const { data: attendance, isLoading: isLoadingAttendence } = useAllAttendence();
  
  const openImageModal = (id: number, name: string, type: 'teacher' | 'section') => {
    setSelectedItem({ id, name, type });
    setIsModalOpen(true);
    setSelectedFile(null);
    setPreviewUrl(null);
  };
    
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const hasAttendance = attendance && attendance.length > 0;
  const hasTeachers = teachers && teachers.length > 0;
  const hasSections = sections?.data?.sections && sections.data.sections.length > 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaFileAlt className="text-dark-blue-700" />
            Management
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">Manage attendance, teachers, and sections</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-3">
            <FiClock className="text-dark-blue-700 text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-dark-blue-800">Attendance</h3>
              <p className="text-sm text-blue-gray-500">Today's attendance records</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Employee Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">On Leave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-100">
              {isLoadingAttendence ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-blue-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-dark-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading attendance...
                    </div>
                  </td>
                </tr>
              ) : hasAttendance ? (
                attendance.map((item) => (
                  <AttendenceCard attendence={item} key={item.id}/>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FiClock className="text-4xl text-blue-gray-300" />
                      <p className="text-blue-gray-500 font-medium">No attendance records found</p>
                      <p className="text-sm text-blue-gray-400">No attendance data available for today</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teachers Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-3">
            <FiUser className="text-dark-blue-700 text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-dark-blue-800">Teachers</h3>
              <p className="text-sm text-blue-gray-500">Manage teachers and their details</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Teacher</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-blue-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-dark-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading teachers...
                    </div>
                  </td>
                </tr>
              ) : hasTeachers ? (
                teachers.map((teacher: any, index: number) => (
                  <TeacherCard teacher={teacher} index={index} key={index} openImageModal={openImageModal}/>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FiUser className="text-4xl text-blue-gray-300" />
                      <p className="text-blue-gray-500 font-medium">No teachers found</p>
                      <p className="text-sm text-blue-gray-400">No teachers have been added yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sections Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-3">
            <FiUsers className="text-dark-blue-700 text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-dark-blue-800">Sections</h3>
              <p className="text-sm text-blue-gray-500">Manage class sections</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Section Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Counselor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Students</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-100">
              {isLoadingSections ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-blue-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-dark-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading sections...
                    </div>
                  </td>
                </tr>
              ) : hasSections ? (
                sections.data.sections.map((section: any, index: number) => (
                  <SectionCard 
                    section={section} 
                    index={index} 
                    key={section.id} 
                    openImageModal={openImageModal}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FiUsers className="text-4xl text-blue-gray-300" />
                      <p className="text-blue-gray-500 font-medium">No sections found</p>
                      <p className="text-sm text-blue-gray-400">No sections have been added yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ImageUploadModal 
        setSelectedFile={setSelectedFile}
        setPreviewUrl={setPreviewUrl}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        selectedFile={selectedFile}
        selectedItem={selectedItem}
        previewUrl={previewUrl}
        sectionData={selectedItem?.type === 'section' ? {
          gradeId: selectedItem.id,
          sectionId: selectedItem.id
        } : undefined}
      />
    </div>
  );
};

export default Management;