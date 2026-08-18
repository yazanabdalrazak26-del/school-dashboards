import { FaCheckCircle, FaExclamationTriangle, FaGraduationCap, FaSpinner, FaTimesCircle } from "react-icons/fa";
import type { StudentsMissingFinalExamResponse, FailedStudentsResponse } from "../../../../../type/manager.type";

type PromoteTabProps = {
  selectedGrade: number | null;
  setSelectedGrade: (grade: number | null) => void;
  passPercent: number;
  setPassPercent: (value: number) => void;
  semester: number;
  gradeOptions: any[];
  gradesLoading: boolean;
  isPromoting: boolean;
  onPromote: () => void;
  missingExamData: StudentsMissingFinalExamResponse | undefined;
  failingStudentsData: FailedStudentsResponse | undefined;
};

export const PromoteTab = ({
  selectedGrade,
  setSelectedGrade,
  passPercent,
  setPassPercent,
  gradeOptions,
  gradesLoading,
  isPromoting,
  onPromote,
  missingExamData,
  failingStudentsData,
}: PromoteTabProps) => {
  const totalMissing = missingExamData?.data?.studentsWithMissingMarks || 0;
  const failedStudents = failingStudentsData?.data?.statistics?.totalFailed || 0;

  const canPromote = selectedGrade && totalMissing === 0 && failedStudents === 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-blue-800 flex items-center gap-2">
            <FaGraduationCap className="text-blue-600" />
            Promote Students
          </h2>
          <p className="text-sm text-blue-gray-500 mt-1">
            Promote students to the next grade level
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-700 font-medium">Important</p>
            <p className="text-sm text-yellow-600">
              Promotion requires all students to have complete marks and no failed students.
              Please check the "Missing Final Exam" and "Failed Students" tabs first.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className={`rounded-xl p-4 border ${totalMissing === 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-2">
            {totalMissing === 0 ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <p className="text-sm font-medium">Final Exams</p>
          </div>
          <p className={`text-lg font-bold ${totalMissing === 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalMissing === 0 ? 'Complete' : `${totalMissing} Missing`}
          </p>
        </div>

        <div className={`rounded-xl p-4 border ${failedStudents === 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-2">
            {failedStudents === 0 ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <p className="text-sm font-medium">Failed Students</p>
          </div>
          <p className={`text-lg font-bold ${failedStudents === 0 ? 'text-green-600' : 'text-red-600'}`}>
            {failedStudents === 0 ? 'None' : `${failedStudents} Failed`}
          </p>
        </div>

        <div className={`rounded-xl p-4 border ${canPromote ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <FaGraduationCap className={canPromote ? 'text-green-500' : 'text-gray-400'} />
            <p className="text-sm font-medium">Ready to Promote</p>
          </div>
          <p className={`text-lg font-bold ${canPromote ? 'text-green-600' : 'text-gray-400'}`}>
            {canPromote ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark-blue-700 mb-1.5">
            Select Grade <span className="text-red-500">*</span>
          </label>
          {gradesLoading ? (
            <div className="flex items-center gap-2">
              <FaSpinner className="animate-spin text-dark-blue-700" />
              <span className="text-sm text-blue-gray-500">Loading...</span>
            </div>
          ) : (
            <select
              value={selectedGrade || ''}
              onChange={(e) => setSelectedGrade(Number(e.target.value))}
              className="w-full max-w-xs px-4 py-2 border border-blue-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-700 bg-white text-dark-blue-800 text-sm"
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
            Pass Percentage <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="40"
              max="70"
              value={passPercent}
              onChange={(e) => setPassPercent(Number(e.target.value))}
              className="w-48 h-2 bg-blue-gray-200 rounded-lg appearance-none cursor-pointer accent-dark-blue-700"
            />
            <span className="text-lg font-bold text-dark-blue-800">{passPercent}%</span>
          </div>
          <p className="text-xs text-blue-gray-400 mt-1">Students with average above this percentage will be promoted</p>
        </div>

        <button
          onClick={onPromote}
          disabled={!canPromote || isPromoting}
          className={`px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 transition-all ${
            canPromote && !isPromoting
              ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isPromoting ? (
            <>
              <FaSpinner className="animate-spin" />
              Promoting...
            </>
          ) : (
            <>
              <FaGraduationCap />
              Promote Students
            </>
          )}
        </button>

        {!canPromote && selectedGrade && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <FaExclamationTriangle />
            Cannot promote. Please check missing exams and failed students first.
          </p>
        )}
      </div>
    </div>
  );
};