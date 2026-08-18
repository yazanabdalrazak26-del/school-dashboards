import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUsers, FaChalkboardTeacher, FaUserTie, FaCalendar, FaSchool, FaBook, FaIdCard } from 'react-icons/fa';
import { SectionsSkeleton } from '../../../ui/skeletons/manager/SectionsSkeleton';
import { useSectionById } from '../../../../hooks/manager/sections/useSection';
import { formatDate } from '../../../../utils/utils';
import SectionTeachersCard from '../cards/SectionTeachersCard';


function SectionDetail() {
    const { gradeId, sectionId } = useParams();
    const navigate = useNavigate();
    const { data: section, isLoading } = useSectionById(Number(gradeId), Number(sectionId));

    const handleBack = () => {
        navigate(`/manager/grades/${gradeId}`);
    };


    if (isLoading) {
        return <SectionsSkeleton />;
    }

    if (!section) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
                <FaUsers className="text-5xl text-blue-gray-300 mx-auto mb-4" />
                <p className="text-blue-gray-500 text-lg">Section not found</p>
                <p className="text-sm text-blue-gray-400 mt-1">The section you're looking for doesn't exist</p>
                <button
                    onClick={handleBack}
                    className="mt-4 px-4 py-2 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleBack}
                    className="p-2 text-dark-blue-700 hover:bg-dark-blue-50 rounded-lg transition-colors"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
                        <FaUsers className="text-dark-blue-700" />
                        {section.name}
                    </h2>
                    <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
                        {section.gradeName} • Section #{section.localSectionNumber}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 rounded-xl">
                            <FaSchool className="text-blue-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-gray-500">Grade</p>
                            <p className="text-lg font-bold text-dark-blue-800">{section.gradeName}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-50 rounded-xl">
                            <FaIdCard className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-gray-500">Section Number</p>
                            <p className="text-lg font-bold text-dark-blue-800">#{section.localSectionNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-purple-50 rounded-xl">
                            <FaUserTie className="text-purple-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-gray-500">Counselor</p>
                            <p className="text-lg font-bold text-dark-blue-800">
                                {section.counselorName || 'Not assigned'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-orange-50 rounded-xl">
                            <FaCalendar className="text-orange-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-gray-500">Created</p>
                            <p className="text-lg font-bold text-dark-blue-800">{formatDate(section?.createdAt as string)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-blue-gray-50 border-b border-blue-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-dark-blue-800 flex items-center gap-2">
                        <FaChalkboardTeacher className="text-dark-blue-600" />
                        Teachers ({section.teachers?.length || 0})
                    </h3>
                </div>

                {section.teachers && section.teachers.length > 0 ? (
                    <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.teachers.map((teacher , index) => (
                                <SectionTeachersCard teacher={teacher} key={index}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <FaChalkboardTeacher className="text-4xl text-blue-gray-300 mx-auto mb-3" />
                        <p className="text-blue-gray-500">No teachers assigned to this section</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SectionDetail;