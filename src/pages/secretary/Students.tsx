
import { 
  FaUserGraduate, 
  FaPlus, 
} from 'react-icons/fa';
import StudentLits from '../../components/secretary/students/StudentLits';
import AddStudentModal from '../../components/secretary/students/modal/AddStudentModal';
import { useState } from 'react';



function Students() {

    const [isOpen , setIsOpen] = useState(false)
  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
                <FaUserGraduate className="text-dark-blue-700" />
                Students
            </h1>
            <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
                Manage student records and information
            </p>
            </div>
            <button 
                className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 hover:bg-dark-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <FaPlus />
                New Student
            </button>
        </div>

        <StudentLits/>

        <AddStudentModal isOpen={isOpen} setIsOpen={setIsOpen}/>
     </div>
  );
}

export default Students;