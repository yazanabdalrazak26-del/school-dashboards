import { 
  FaPlus, 
  FaUserTie, 
  FaBuilding,
} from 'react-icons/fa';
import { useSchools } from '../../hooks/admin/school/useSchool';
import SchoolCardSkeleton from '../../components/ui/skeletons/Admin/SchoolCardSkeleton';
import SchoolCard from '../../components/admin/Employees/cards/SchoolCard';

const Employees = () => {
  const { data: schools, isLoading: isLoadingSchools } = useSchools();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaUserTie className="text-dark-blue-700" />
            Employees
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Manage employees across all schools
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-blue-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
          <FaBuilding className="text-dark-blue-700" />
          Schools
        </h3>
        <div className="grid grid-cols-2 gap-5">
          {isLoadingSchools ? (
            [1, 2, 3, 4, 5, 6].map((index) => (
              <SchoolCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            schools?.map((school) => (
              <SchoolCard school={school} key={school.id}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;