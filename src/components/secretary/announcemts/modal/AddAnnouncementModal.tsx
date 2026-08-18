import { FaTimes, FaBullhorn } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../../ui/Input';
import { useAddAnnouncements } from '../../../../hooks/secretary/annoucements/useAnnouncementMutation';
import { getErrorMessage } from '../../../../utils/utils';
import type { AnnouncementAudience, AnnouncementType, AnnouncementPayload } from '../../../../type/secretary.type';

type AddAnnouncementModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

function AddAnnouncementModal({ isOpen, setIsOpen }: AddAnnouncementModalProps) {
    if (!isOpen) return null;

    const audienceOptions: AnnouncementAudience[] = [
        'All', 'Students', 'Teachers', 'Parents', 'Staff',
        'Employees', 'Section', 'Grade', 'Administrators'
    ];

    const typeOptions: AnnouncementType[] = ['General', 'Activity'];

    const [formData, setFormData] = useState<AnnouncementPayload>({
        title: '',
        body: '',
        audience: 'All',
        type: 'General',
        expiryDate: ''
    });

    const { mutateAsync: addAnnouncement, isPending } = useAddAnnouncements();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error('Title is required');
            return;
        }

        if (!formData.body.trim()) {
            toast.error('Body is required');
            return;
        }

        if (!formData.audience) {
            toast.error('Audience is required');
            return;
        }

        if (!formData.type) {
            toast.error('Type is required');
            return;
        }

        try {
            await addAnnouncement(formData);
            toast.success('Announcement added successfully');
            setIsOpen(false);
            setFormData({
                title: '',
                body: '',
                audience: 'All',
                type: 'General',
                expiryDate: ''
            });
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <section className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-50 w-full max-w-xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>

                    <header className='mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100 relative'>
                        <div className='absolute left-0 top-0 w-1 h-12 sm:h-14 bg-dark-blue-600 rounded-full'></div>
                        <div className="flex justify-between items-center">
                            <h3 className='text-xl sm:text-2xl flex items-center gap-3 text-dark-blue-800 font-semibold pl-3'>
                                <MdOutlineEdit className='text-2xl sm:text-3xl text-dark-blue-600 flex-shrink-0' />
                                <span className='text-lg sm:text-xl'>Add New Announcement</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="text-xl sm:text-2xl" />
                            </button>
                        </div>
                        <p className='text-sm sm:text-base text-gray-500 mt-1 ml-3 sm:ml-12'>
                            Fill in the details below to create a new announcement
                        </p>
                    </header>

                    <div className='rounded-lg flex flex-col gap-4 sm:gap-5'>
                        <Input
                            title="Title"
                            placeholder="Enter announcement title"
                            icon={<FaBullhorn className='text-dark-blue-700' />}
                            onChange={handleChange}
                            name="title"
                            value={formData.title}
                            required={true}
                        />

                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                Body <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="body"
                                placeholder="Enter announcement description"
                                rows={4}
                                value={formData.body}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                Audience <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="audience"
                                value={formData.audience}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white appearance-none cursor-pointer hover:border-dark-blue-400"
                                required
                            >
                                {audienceOptions.map((audience) => (
                                    <option key={audience} value={audience}>
                                        {audience}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white appearance-none cursor-pointer hover:border-dark-blue-400"
                                required
                            >
                                {typeOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white"
                            />
                        </div>
                    </div>

                    <>
                        <hr className='border-0 h-px bg-gray-400 mt-3 w-[90%] self-center' />
                        <div className='flex xs:flex-row items-center gap-3 sm:gap-4 mt-3'>
                            <button
                                type="submit"
                                disabled={isPending}
                                className='
                                    w-full xs:flex-1 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg 
                                    bg-dark-blue-600 text-white 
                                    shadow-md hover:shadow-lg 
                                    transition-all duration-200 
                                    transform hover:-translate-y-0.5
                                    hover:bg-dark-blue-700
                                    flex items-center justify-center gap-2
                                    cursor-pointer
                                    text-sm sm:text-base font-medium
                                    order-2 xs:order-1
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                '
                            >
                                <FaBullhorn className="text-sm" />
                                {isPending ? 'Adding...' : 'Add Announcement'}
                            </button>

                            <button
                                type="button"
                                className='
                                    w-full xs:flex-1 px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg 
                                    border border-gray-300 
                                    text-gray-600 bg-white 
                                    hover:bg-gray-50 hover:border-gray-400 
                                    transition-all duration-200
                                    cursor-pointer
                                    text-sm sm:text-base font-medium
                                    order-1 xs:order-2
                                '
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                </form>
            </section>
        </div>,
        document.body
    );
}

export default AddAnnouncementModal;