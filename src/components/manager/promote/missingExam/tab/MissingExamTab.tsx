import { useState } from "react";
import { FaExclamationTriangle, FaSpinner, FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import SearchResultCards from "../cards/SearchResultCards";
import StudentList from "../StudentLists";

type MissingExamTabProps = {
  data: any;
  isLoading: boolean;
  selectedGrade: number | null;
  setSelectedGrade: (grade: number | null) => void;
  semester: number;
  setSemester: (semester: number) => void;
  gradeOptions: any[];
  gradesLoading: boolean;
  refetch: () => void;
};

export const MissingExamTab = ({
  data,
  isLoading,
  selectedGrade,
  setSelectedGrade,
  semester,
  setSemester,
  gradeOptions,
  gradesLoading,
  refetch,
}: MissingExamTabProps) => {
  const [localSelectedGrade, setLocalSelectedGrade] = useState<number | null>(selectedGrade);
  const [localSemester, setLocalSemester] = useState<number>(semester);
  const [hasSearched, setHasSearched] = useState(false);

  const missingStudents = data?.data?.students || [];
  const totalMissing = data?.data?.studentsWithMissingMarks || 0;
  const totalStudents = data?.data?.totalStudents || 0;
  const gradeName = data?.data?.gradeName || '';

  const handleSearch = () => {
    if (localSelectedGrade) {
      setSelectedGrade(localSelectedGrade);
      setSemester(localSemester);
      setHasSearched(true);
    } else {
      toast.error('Please select a grade');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-blue-800 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-500" />
            Students Missing Final Exam
          </h2>
          <p className="text-sm text-blue-gray-500 mt-1">
            Students who haven't completed their final exams
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={!selectedGrade}
          className="flex items-center gap-2 px-4 py-2 bg-blue-gray-50 hover:bg-blue-gray-100 rounded-lg transition-colors text-sm text-dark-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSpinner className={`${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
            Select Grade
          </label>
          {gradesLoading ? (
            <div className="flex items-center gap-2">
              <FaSpinner className="animate-spin text-dark-blue-700" />
              <span className="text-sm text-blue-gray-500">Loading...</span>
            </div>
          ) : (
            <select
              value={localSelectedGrade || ''}
              onChange={(e) => setLocalSelectedGrade(Number(e.target.value))}
              className="w-48 px-4 py-2 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
            >
              <option value="">Select grade</option>
              {gradeOptions.map((grade: any) => (
                <option key={grade.id} value={grade.localGradeNumber}>
                  {grade.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
            Semester
          </label>
          <select
            value={localSemester}
            onChange={(e) => setLocalSemester(Number(e.target.value))}
            className="w-32 px-4 py-2 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
          >
            <option value={1}>Semester 1</option>
            <option value={2}>Semester 2</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={!localSelectedGrade || isLoading}
            className="px-6 py-2 bg-dark-blue-600 hover:bg-dark-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <FaFilter />
                Search
              </>
            )}
          </button>
        </div>
      </div>


      {hasSearched && selectedGrade && (
        <SearchResultCards gradeName={gradeName} totalMissing={totalMissing} totalStudents={totalStudents}/>
      )}


      <StudentList
        gradeName={gradeName}
        isLoading={isLoading}
        hasSearched={hasSearched}
        selectedGrade={selectedGrade}
        missingStudents={missingStudents}
      />
        
      
    </div>
  );
};