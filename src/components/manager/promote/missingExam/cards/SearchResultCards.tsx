
type SearchResultCardsProps = {
    gradeName: string
    totalMissing: number 
    totalStudents: number
}

function SearchResultCards({
    gradeName,
    totalMissing,
    totalStudents,
}:SearchResultCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
        <p className="text-sm text-yellow-600">{gradeName}</p>
        <p className="text-2xl font-bold text-yellow-700">{totalMissing}</p>
        <p className="text-xs text-yellow-500">Students missing final exam</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <p className="text-sm text-blue-600">Total Students</p>
        <p className="text-2xl font-bold text-blue-700">{totalStudents}</p>
        <p className="text-xs text-blue-500">In this grade</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
        <p className="text-sm text-purple-600">Completion Rate</p>
        <p className="text-2xl font-bold text-purple-700">
            {totalStudents > 0 ? Math.round((1 - totalMissing / totalStudents) * 100) : 0}%
        </p>
        <p className="text-xs text-purple-500">Students with all marks</p>
        </div>
    </div>
  )
}

export default SearchResultCards