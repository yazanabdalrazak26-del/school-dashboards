import { FaTimesCircle, FaSpinner, FaCheckCircle } from "react-icons/fa";
import type { FailedStudentsByGrade, FailedStudentsResponse } from "../../../../../type/manager.type";
import FailedByGradeCard from "../cards/FailedByGradeCard";

type FailedStudentsTabProps = {
  data: FailedStudentsResponse | undefined;
  isLoading: boolean;
  refetch: () => void;
};

export const FailedStudentsTab = ({ data, isLoading, refetch }: FailedStudentsTabProps) => {
  const statistics = data?.data?.statistics;
  const failedByGrade = data?.data?.failedByGrade || [];
  const totalFailed = statistics?.totalFailed || 0;
  const totalStudents = statistics?.totalStudents || 0;
  const successRate = statistics?.overallSuccessRate || 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-dark-blue-800 flex items-center gap-2">
            <FaTimesCircle className="text-red-500" />
            Failed Students
          </h2>
          <p className="text-sm text-blue-gray-500 mt-1">
            Students who failed across all grades
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-gray-50 hover:bg-blue-gray-100 rounded-lg transition-colors text-sm text-dark-blue-700"
        >
          <FaSpinner className={`${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <p className="text-sm text-red-600">Total Failed</p>
          <p className="text-2xl font-bold text-red-700">{totalFailed}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-sm text-green-600">Total Passed</p>
          <p className="text-2xl font-bold text-green-700">{totalStudents - totalFailed}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-blue-600">Success Rate</p>
          <p className="text-2xl font-bold text-blue-700">{successRate}%</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-600">Failure Rate</p>
          <p className="text-2xl font-bold text-gray-700">{100 - successRate}%</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-dark-blue-700 text-3xl" />
        </div>
      ) : failedByGrade.length === 0 ? (
        <div className="text-center py-12">
          <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
          <p className="text-green-600 font-medium">No failed students!</p>
          <p className="text-sm text-blue-gray-400 mt-1">All students passed their exams</p>
        </div>
      ) : (
        <div className="space-y-6">
          {failedByGrade.map((gradeData: FailedStudentsByGrade) => (
            <FailedByGradeCard gradeData={gradeData}/>
          ))}
        </div>
      )}
    </div>
  );
};