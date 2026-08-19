import { useState } from 'react'
import { getUniqueGrades } from '../../../../utils/manager.utils';
import type { Section, Subject, Teacher } from '../../../../type/manager.type';
import { FaBook, FaEye, FaEdit, FaTrash, FaUserTie, FaUser, FaGraduationCap, FaArrowDown } from 'react-icons/fa';
import SubjectsSectionsCard from './SubjectsSectionsCard';
import EditSubjectModal from '../modal/EditSubjectModal';
import SubjectDetailsModal from '../modal/ShowSubjectModal';
import DeleteModal from '../../../ui/modal/DeleteModal';
import { useDeleteSubject } from '../../../../hooks/manager/subjects/useSubjectsMutation';

function SubjectsCard({subject} : {subject: Subject}) {
    const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

    const toggleExpand = (subjectId: number) => {
        setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
    };

    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenShow, setIsOpenShow] = useState(false);

    const {mutateAsync: deleteSubject , isPending} = useDeleteSubject();

    const handleDelete = async () => {
        await deleteSubject({id: subject.localSubjectId});
    };
    
    const uniqueGrades = getUniqueGrades(subject.sections || []);
    const totalTeachers = subject.teachers?.length || 0;
    const totalSections = subject.sections?.length || 0;
    const isExpanded = expandedSubject === subject.id;

    return (
        <>
            <div 
                className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
                <div 
                    className="p-5 cursor-pointer hover:bg-blue-gray-50/50 transition-colors"
                    onClick={() => toggleExpand(subject.id)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-blue-50 rounded-xl">
                                <FaBook className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue-800 text-lg">
                                    {subject.name}
                                </h3>
                                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                                    <span className="text-xs text-blue-gray-300">|</span>
                                    <span className="text-xs text-blue-gray-500">
                                        {totalSections} Sections
                                    </span>
                                    <span className="text-xs text-blue-gray-300">|</span>
                                    <span className="text-xs text-blue-gray-500">
                                        {totalTeachers} Teachers
                                    </span>
                                    {uniqueGrades.length > 0 && (
                                        <>
                                            <span className="text-xs text-blue-gray-300">|</span>
                                            <span className="text-xs text-blue-gray-500">
                                                Grades: {uniqueGrades.map(g => g.gradeName).join(', ')}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                <button 
                                    className="p-1.5 cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="View"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsOpenShow(true)
                                    }}
                                >
                                    <FaEye className="text-sm" />
                                </button>
                                <button 
                                    className="p-1.5 cursor-pointer text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Edit"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsOpenEdit(true)
                                    }}
                                >
                                    <FaEdit className="text-sm" />
                                </button>
                                <button 
                                    className="p-1.5 cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsOpenDelete(true)
                                    }}
                                >
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>
                            <span className={`text-blue-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                <FaArrowDown/>
                            </span>
                        </div>
                    </div>
                </div>

                {isExpanded && (
                    <div className="border-t border-blue-gray-100 p-5 bg-blue-gray-50/30">
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-dark-blue-700 mb-2 flex items-center gap-2">
                                <FaUserTie className="text-dark-blue-500" />
                                Teachers ({totalTeachers})
                            </h4>
                            {totalTeachers > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {subject.teachers?.map((teacher: Teacher , index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 bg-white border border-blue-gray-100 rounded-full text-sm text-dark-blue-700 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <FaUser className="inline mr-1 text-blue-gray-400 text-xs" />
                                            {teacher.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-blue-gray-400 italic">No teachers assigned</p>
                            )}
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-dark-blue-700 mb-2 flex items-center gap-2">
                                <FaGraduationCap className="text-dark-blue-500" />
                                Sections ({totalSections})
                            </h4>
                            {totalSections > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {subject.sections?.map((section: Section, index) => (
                                        <SubjectsSectionsCard section={section} key={index}/>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-blue-gray-400 italic">No sections assigned</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <EditSubjectModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} subject={{id: subject.localSubjectId, name: subject.name}}/>
            
            <SubjectDetailsModal isOpen={isOpenShow} setIsOpen={setIsOpenShow} id={subject.localSubjectId}/>

            <DeleteModal
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                item={{ id: subject.localSubjectId, name: subject.name }}
                title="Delete Subject"
                entityName="subject"
                onDelete={handleDelete}
                isLoading={isPending}
            />
        </>
    );
}

export default SubjectsCard;