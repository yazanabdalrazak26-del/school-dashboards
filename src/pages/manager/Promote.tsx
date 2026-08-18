import { useEffect, useState } from 'react';
import { 
  FaGraduationCap, 
  FaExclamationTriangle, 
  FaTimesCircle,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/utils';
import { useGetAllFailingStudents, useGetMissingFinalExam } from '../../hooks/manager/promote/usePromote';
import { usePromoteStudents } from '../../hooks/manager/promote/usePromoteMutation';
import { useGrade } from '../../hooks/manager/grades/useGrades';
import { MissingExamTab } from '../../components/manager/promote/missingExam/tab/MissingExamTab';
import { FailedStudentsTab } from '../../components/manager/promote/missingExam/tab/FailedStudentsTab';
import { PromoteTab } from '../../components/manager/promote/missingExam/tab/PromoteTab';

type TabType = 'missing-exam' | 'failed-students' | 'promote';

function PromoteStudents() {
  const [selectedTab, setSelectedTab] = useState<TabType>('missing-exam');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [passPercent, setPassPercent] = useState<number>(50);
  const [semester, setSemester] = useState<number>(2);

  useEffect(() =>{
    console.log(selectedGrade)
  } , [selectedGrade])

  const { data: grades, isLoading: gradesLoading } = useGrade();
  const { data: missingExamData, isLoading: missingExamLoading, refetch: refetchMissing } = useGetMissingFinalExam(
    selectedGrade || 0,
    semester
  );
  const { data: failingStudentsData, isLoading: failingStudentsLoading, refetch: refetchFailing } = useGetAllFailingStudents();
  const { mutateAsync: promoteStudents, isPending: isPromoting } = usePromoteStudents();

  const handlePromote = async () => {
    if (!selectedGrade) {
      toast.error('Please select a grade');
      return;
    }

    try {
      await promoteStudents({
        localGradeNumber: selectedGrade,
        passPercent: passPercent
      });
      toast.success('Students promoted successfully');
      refetchMissing();
      refetchFailing();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const tabs = [
    { id: 'missing-exam', label: 'Missing Final Exam', icon: <FaExclamationTriangle /> },
    { id: 'failed-students', label: 'Failed Students', icon: <FaTimesCircle /> },
    { id: 'promote', label: 'Promote Students', icon: <FaGraduationCap /> },
  ];

  const gradeOptions = grades || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="ltr">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
          <FaGraduationCap className="text-dark-blue-700" />
          Student Promotion
        </h1>
        <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
          Manage student promotion and view academic performance
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-2 mb-6 flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
              selectedTab === tab.id
                ? 'bg-dark-blue-700 text-white shadow-md shadow-dark-blue-700/20'
                : 'text-blue-gray-600 hover:bg-blue-gray-50 hover:text-dark-blue-800'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6">
        {selectedTab === 'missing-exam' && (
          <MissingExamTab 
            data={missingExamData}
            isLoading={missingExamLoading}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            semester={semester}
            setSemester={setSemester}
            gradeOptions={gradeOptions}
            gradesLoading={gradesLoading}
            refetch={refetchMissing}
          />
        )}

        {selectedTab === 'failed-students' && (
          <FailedStudentsTab 
            data={failingStudentsData}
            isLoading={failingStudentsLoading}
            refetch={refetchFailing}
          />
        )}

        {selectedTab === 'promote' && (
          <PromoteTab 
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            passPercent={passPercent}
            setPassPercent={setPassPercent}
            semester={semester}
            gradeOptions={gradeOptions}
            gradesLoading={gradesLoading}
            isPromoting={isPromoting}
            onPromote={handlePromote}
            missingExamData={missingExamData}
            failingStudentsData={failingStudentsData}
          />
        )}
      </div>
    </div>
  );
}





export default PromoteStudents;