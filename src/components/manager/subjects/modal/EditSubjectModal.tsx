'use client';

import React, { useState, useEffect } from 'react';
import { MdClose, MdSave, MdSubject } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useUpdateSubject } from '../../../../hooks/manager/subjects/useSubjectsMutation';
import { getErrorMessage } from '../../../../utils/utils';


interface EditSubjectModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  subject: {
    id: number;
    name: string;
  };
}

function EditSubjectModal({ isOpen, setIsOpen, subject }: EditSubjectModalProps) {
  const [name, setName] = useState('');
  const { isPending, mutateAsync: updateSubject } = useUpdateSubject();

  useEffect(() => {
    if (isOpen && subject) {
      setName(subject.name || '');
    }
  }, [isOpen, subject]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Subject name is required");
      return;
    }

    if (name.trim() === subject.name) {
      setIsOpen(false);
      return;
    }

    try {
      await updateSubject({
        id: subject.id,
        data: { Name: name.trim() },
      });
      
      toast.success('Subject updated successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl p-5 sm:p-6 w-full max-w-sm sm:max-w-md mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4 sm:mb-5'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>Edit Subject</h2>
          <button
            onClick={() => setIsOpen(false)}
            className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors'
            disabled={isPending}
            aria-label="Close modal"
          >
            <MdClose className='text-xl sm:text-2xl' />
          </button>
        </div>

        <div className='space-y-3 sm:space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Subject Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isPending}
                className='outline-0 w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                autoFocus
                placeholder="Enter subject name..."
              />
              <MdSubject className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl' />
            </div>
          </div>

          <div className='flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4'>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              disabled={isPending}
              className='w-full cursor-pointer sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base font-medium'
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={handleSave}
              disabled={isPending}
              className='w-full cursor-pointer sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base font-medium'
            >
              {isPending ? (
                'Saving...'
              ) : (
                <span className='flex items-center gap-2'>
                  <MdSave className='text-lg sm:text-xl' /> 
                  Save Changes
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSubjectModal;