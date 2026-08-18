
import { FaPlus } from 'react-icons/fa'

function Header({setIsOpen} : {setIsOpen: (value: boolean) => void}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800">Schools</h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">Manage all schools in the system</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors shadow-lg shadow-dark-blue-700/20"
        >
          <FaPlus /> Add School
        </button>
    </div>
  )
}

export default Header