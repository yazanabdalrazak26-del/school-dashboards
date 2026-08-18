import { FaTimes, FaSchool, FaPhone } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import Input from '../../../ui/Input';
import { FaLocationDot } from 'react-icons/fa6';
import { useState } from 'react';
import type{ SchoolFormData } from '../../../../type/school.type';
import { useCreateSchool } from '../../../../hooks/admin/school/useSchoolMutation';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { createPortal } from 'react-dom';


type AddSchoolModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

function AddSchoolModal({
    isOpen,
    setIsOpen
}: AddSchoolModalProps) {

    if (!isOpen) return null;

    const TYPE = ['Primary' , 'Preparatory' , 'Secondary' , 'PrimaryPreparatory' , 'PreparatorySecondary' , 'AllStages']

    const [data , setData] = useState<SchoolFormData>({
        name: '',
        type: 'Primary',
        address: '',
        phone: '',
    })

    const {mutateAsync: createSchool , isPending} = useCreateSchool();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name , value} = e.target;
        setData((prev) => ({...prev , [name]: value}));
    }

    const handleSubmit = async (e:React.SubmitEvent) =>{
        e.preventDefault()
        try{
            if(!data.name.trim()){
                toast.error('the name filed is require');
            }

            if(!data.type.trim()){
                toast.error('the type filed is require');
            }

            if(!data.address.trim()){
                toast.error('the address filed is require');
            }

            if(!data.phone.trim()){
                toast.error('the phone filed is require');
            }

            await createSchool(data);
            toast.success('School added sucessfully')
            setIsOpen(false);

        }catch(error){
            toast.error(getErrorMessage(error));
        }
    }

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <section className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-50 w-full max-w-xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>

                    <header className='mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100 relative'>
                        <div className='absolute left-0 top-0 w-1 h-12 sm:h-14 bg-dark-blue-600 rounded-full'></div>
                        <div className="flex justify-between items-center">
                            <h3 className='text-xl sm:text-2xl flex items-center gap-3 text-dark-blue-800 font-semibold pl-3'>
                                <MdOutlineEdit className='text-2xl sm:text-3xl text-dark-blue-600 flex-shrink-0' />
                                <span className='text-lg sm:text-xl'>Add New School</span>
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
                            Fill in the details below to create a new school
                        </p>
                    </header>

                    <div className='rounded-lg flex flex-col gap-4 sm:gap-5'>
                        <Input 
                            title="School Name"
                            placeholder="Enter school name"
                            icon={<FaSchool className='text-dark-blue-700'/>}
                            onChange={handleChange}
                            name='name'
                            required={true}
                        />
                        
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                                School Type <span className="text-red-500">*</span>
                            </label>
                            <select name='type' onChange={(e) => handleChange(e)} className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white">
                                {TYPE.map(type => (
                                    <option key={type} value={type}>{type}</option> 
                                ))}
                            </select>
                        </div>
                        
                        <Input 
                            title="Address"
                            placeholder="Enter school address"
                            icon={<FaLocationDot className='text-dark-blue-700'/>}
                            onChange={handleChange}
                            required={true}
                            name='address'
                        />
                        
                        <Input 
                            title="Phone Number"
                            placeholder="Enter phone number"
                            icon={<FaPhone  className='text-dark-blue-700'/>}
                            type="tel"
                            onChange={handleChange}
                            required={true}
                            name='phone'
                        />
                    </div>

                    <>
                        <hr className='border-0 h-px bg-gray-400 mt-3 w-[90%] self-center'/>
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
                                    order-2 xs:order-1 disabled:opacity-50 disabled:cursor-not-allowed
                                '
                            >
                                {isPending ? 'Adding...' : "Add School"}
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
    )
}

export default AddSchoolModal