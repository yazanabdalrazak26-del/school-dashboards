'use client';

import React, { useState, useEffect } from 'react';
import { MdClose, MdSave } from 'react-icons/md';
import { FaBullhorn, FaUsers, FaTag, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import { useUpdateAnnouncements } from '../../../../hooks/secretary/annoucements/useAnnouncementMutation';
import { getErrorMessage } from '../../../../utils/utils';
import Input from '../../../ui/Input';
import type { Announcement, AnnouncementAudience, AnnouncementPayload, AnnouncementType, ShowAnnouncement } from '../../../../type/secretary.type';

interface EditAnnouncementModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    announcement: Announcement
}

function EditAnnouncementModal({ isOpen, setIsOpen, announcement }: EditAnnouncementModalProps) {
    const [formData, setFormData] = useState<AnnouncementPayload>({
        title: '',
        body: '',
        audience: 'All',
        type: 'General',
        expiryDate: ''
    });

    const { isPending, mutateAsync: updateAnnouncement } = useUpdateAnnouncements();

    const audienceOptions: AnnouncementAudience[] = [
        'All', 'Students', 'Teachers', 'Parents', 'Staff',
        'Employees', 'Section', 'Grade', 'Administrators'
    ];

    const typeOptions: AnnouncementType[] = ['General', 'Activity'];

    useEffect(() => {
        if (isOpen && announcement) {
            setFormData({
                title: announcement.title || '',
                body: announcement.description || '',
                audience: 'All',
                type: 'General',
                expiryDate: announcement.expiryDate || ''
            });
        }
    }, [isOpen, announcement]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        if (!formData.title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!formData.body.trim()) {
            toast.error("Body is required");
            return;
        }

        if (!formData.audience) {
            toast.error("Audience is required");
            return;
        }

        if (!formData.type) {
            toast.error("Type is required");
            return;
        }

        try {
            await updateAnnouncement({
                id: announcement.id,
                data: formData,
            });

            toast.success('Announcement updated successfully');
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

    return createPortal(
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl p-5 sm:p-6 w-full max-w-lg sm:max-w-xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-4 sm:mb-5'>
                    <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>Edit Announcement</h2>
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
                    <Input
                        title="Title"
                        placeholder="Enter announcement title..."
                        icon={<FaBullhorn className='text-dark-blue-700' />}
                        onChange={handleChange}
                        name="title"
                        value={formData.title}
                        required={true}
                        disabled={isPending}
                    />

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Body <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name='body'
                            value={formData.body}
                            onChange={handleChange}
                            disabled={isPending}
                            rows={4}
                            className='outline-0 w-full px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none'
                            placeholder="Enter announcement description..."
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Audience <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name='audience'
                                value={formData.audience}
                                onChange={handleChange}
                                disabled={isPending}
                                className='outline-0 w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white appearance-none'
                            >
                                {audienceOptions.map((audience) => (
                                    <option key={audience} value={audience}>
                                        {audience}
                                    </option>
                                ))}
                            </select>
                            <FaUsers className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl pointer-events-none' />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name='type'
                                value={formData.type}
                                onChange={handleChange}
                                disabled={isPending}
                                className='outline-0 w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white appearance-none'
                            >
                                {typeOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <FaTag className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl pointer-events-none' />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Expiry Date
                        </label>
                        <div className="relative">
                            <input
                                type='datetime-local'
                                name='expiryDate'
                                value={formData.expiryDate}
                                onChange={handleChange}
                                disabled={isPending}
                                className='outline-0 w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                            />
                            <FaClock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl' />
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5">Leave empty if no expiry date</p>
                    </div>

                    <div className='flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4'>
                        <button
                            type='button'
                            onClick={() => setIsOpen(false)}
                            disabled={isPending}
                            className='w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm sm:text-base font-medium'
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            onClick={handleSave}
                            disabled={isPending}
                            className='w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base font-medium'
                        >
                            {isPending ? (
                                'Saving...'
                            ) : (
                                <span className='flex items-center gap-2'><MdSave className='text-lg sm:text-xl' /> Save Changes</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default EditAnnouncementModal;