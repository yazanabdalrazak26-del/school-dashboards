// import { FaUsers, FaPlus} from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import { SectionsSkeleton } from '../../components/ui/skeletons/manager/SectionsSkeleton';
// import SectionCard from '../../components/manager/sections/cards/SectionCard';
// import { useSection } from '../../hooks/manager/sections/useSection';

// const Sections = () => {
//     const { gradeId } = useParams();

//     const {data: gradeData , isLoading} = useSection(Number(gradeId));

//     if (isLoading) {
//       return <SectionsSkeleton />;
//     }

//     if (!gradeData) {
//         return (
//             <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
//                 <FaUsers className="text-5xl text-blue-gray-300 mx-auto mb-4" />
//                 <p className="text-blue-gray-500 text-lg">Grade not found</p>
//                 <p className="text-sm text-blue-gray-400 mt-1">The grade you're looking for doesn't exist</p>
//             </div>
//         );
//     }


//     return (
//         <div>
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                 <div>
//                     <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
//                         <FaUsers className="text-dark-blue-700" />
//                         Sections
//                     </h2>
//                     <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
//                         {gradeData?.gradeName} • {gradeData?.sections.length}
//                     </p>
//                 </div>
//                 <button className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors shadow-lg shadow-dark-blue-700/20">
//                     <FaPlus /> Add Section
//                 </button>
//             </div>

//             <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Section Name</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Section #</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Counselor</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Students</th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Created</th>
//                       <th className="px-6 py-4 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-blue-gray-100">
//                     {gradeData?.sections.map((section) => (
//                       <SectionCard key={section.id} section={section} />
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//                 <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
//                     <p className="text-sm text-blue-gray-500">Total Sections</p>
//                     <p className="text-2xl font-bold text-dark-blue-800">{gradeData?.sections.length}</p>
//                 </div>
//                 <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
//                     <p className="text-sm text-blue-gray-500">Grade</p>
//                     <p className="text-2xl font-bold text-dark-blue-800">{gradeData?.gradeName}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sections;