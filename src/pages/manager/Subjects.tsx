import { FaClipboardList, FaPlus, FaBook } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { useSubjects } from '../../hooks/manager/subjects/useSubjects';
import SubjectsCard from '../../components/manager/subjects/cards/SubjectsCard';
import { useState } from 'react';
import AddSubjectModal from '../../components/manager/subjects/modal/AddSubjectModal';


const Subjects = () => {
  const { data: subjects, isLoading: isLoading } = useSubjects();
  const [isOpen , setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-dark-blue-700 text-4xl" />
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
        <FaBook className="text-5xl text-blue-gray-300 mx-auto mb-4" />
        <p className="text-blue-gray-500 text-lg">No subjects found</p>
        <button onClick={() =>setIsOpen(true)} className="mt-4 px-4 py-2 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors text-sm">
          Add Subject
        </button>

        <AddSubjectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>

    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaClipboardList className="text-dark-blue-700" />
            Subjects
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Manage all subjects in the system
          </p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors shadow-lg shadow-dark-blue-700/20"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {subjects?.map((subject) => (
          <SubjectsCard subject={subject} key={subject.id} />
        ))}
      </div>

      <AddSubjectModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </div>
  );
};

export default Subjects;