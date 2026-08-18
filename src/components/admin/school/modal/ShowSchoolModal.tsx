'use client';

import React from 'react';
import { MdClose } from 'react-icons/md';
import { FaSchool, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaUserTie, FaBook } from 'react-icons/fa';
import type { School } from '../../../../type/school.type';
import { formatDate } from '../../../../utils/utils';

interface ShowSchoolModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  school: School;
}

function ShowSchoolModal({ isOpen, setIsOpen, school }: ShowSchoolModalProps) {
  if (!isOpen) return null;


  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl p-5 sm:p-6 w-full max-w-lg sm:max-w-xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-2.5'>
            <div className='bg-blue-100 p-1.5 rounded-lg'>
              <FaSchool className='text-xl sm:text-2xl text-blue-600' />
            </div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
              School Details
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors'
          >
            <MdClose className='text-xl sm:text-2xl' />
          </button>
        </div>

        <div className='mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100'>
          <h3 className='text-lg sm:text-xl font-bold text-blue-800 text-center'>
            {school.name}
          </h3>
          <p className='text-center text-blue-600 text-xs sm:text-sm mt-1'>
            {school.typeName || school.type}
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
          <div className='bg-gray-50 rounded-lg p-3'>
            <div className='flex items-center gap-1.5 mb-0.5'>
              <FaSchool className='text-blue-500 text-base' />
              <span className='text-[10px] sm:text-xs font-medium text-gray-500'>School Type</span>
            </div>
            <p className='text-sm sm:text-base font-semibold text-gray-800'>
              {school.typeName || school.type}
            </p>
          </div>

          <div className='bg-gray-50 rounded-lg p-3'>
            <div className='flex items-center gap-1.5 mb-0.5'>
              <FaMapMarkerAlt className='text-green-500 text-base' />
              <span className='text-[10px] sm:text-xs font-medium text-gray-500'>Address</span>
            </div>
            <p className='text-sm sm:text-base font-semibold text-gray-800'>
              {school.address || 'N/A'}
            </p>
          </div>

          <div className='bg-gray-50 rounded-lg p-3'>
            <div className='flex items-center gap-1.5 mb-0.5'>
              <FaPhone className='text-purple-500 text-base' />
              <span className='text-[10px] sm:text-xs font-medium text-gray-500'>Phone</span>
            </div>
            <p className='text-sm sm:text-base font-semibold text-gray-800'>
              {school.phone || 'N/A'}
            </p>
          </div>

          <div className='bg-gray-50 rounded-lg p-3'>
            <div className='flex items-center gap-1.5 mb-0.5'>
              <FaCalendarAlt className='text-orange-500 text-base' />
              <span className='text-[10px] sm:text-xs font-medium text-gray-500'>Created</span>
            </div>
            <p className='text-sm sm:text-base font-semibold text-gray-800'>
              {formatDate(school.createdAt)}
            </p>
          </div>
        </div>

        <div className='mt-4'>
          <h4 className='text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
            Statistics
          </h4>
          <div className='grid grid-cols-3 gap-3'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center'>
              <FaUserTie className='text-xl sm:text-2xl text-blue-600 mx-auto mb-1' />
              <p className='text-[10px] sm:text-xs text-gray-600'>Employees</p>
              <p className='text-lg sm:text-xl font-bold text-blue-700'>
                {school.employeesCount || 0}
              </p>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center'>
              <FaUsers className='text-xl sm:text-2xl text-green-600 mx-auto mb-1' />
              <p className='text-[10px] sm:text-xs text-gray-600'>Students</p>
              <p className='text-lg sm:text-xl font-bold text-green-700'>
                {school.studentsCount || 0}
              </p>
            </div>

            <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center'>
              <FaBook className='text-xl sm:text-2xl text-purple-600 mx-auto mb-1' />
              <p className='text-[10px] sm:text-xs text-gray-600'>Sections</p>
              <p className='text-lg sm:text-xl font-bold text-purple-700'>
                {school.sectionsCount || 0}
              </p>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200'>
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            className='px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowSchoolModal;