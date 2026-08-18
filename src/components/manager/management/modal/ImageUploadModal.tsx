import { FaImage } from "react-icons/fa";
import { FiUpload, FiX } from "react-icons/fi";
import { useAddScheduleTeacher, useAddScheduleSection } from "../../../../hooks/manager/managemets/useManagementMutations";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../../utils/utils";

type ImageUploadModalProps = {
    setSelectedFile: (value: File | null) => void
    setPreviewUrl: (value: string | null) => void
    closeModal: () => void
    isModalOpen: boolean;
    selectedItem: { id: number; name: string; type: 'teacher' | 'section' } | null
    selectedFile: File | null;
    previewUrl: string | null;
    sectionData?: {
        gradeId: number;
        sectionId: number;
    } | null;
}

export const ImageUploadModal = ({
    setPreviewUrl,
    closeModal,
    setSelectedFile,
    isModalOpen,
    selectedFile,
    selectedItem,
    previewUrl,
    sectionData
}: ImageUploadModalProps) => {

    const { mutateAsync: addScheduleTeacher, isPending: isTeacherPending } = useAddScheduleTeacher();
    const { mutateAsync: addScheduleSection, isPending: isSectionPending } = useAddScheduleSection();
    
    const isPending = isTeacherPending || isSectionPending;

    const handleAdd = async () => {
        try {
            if (!selectedItem?.id) {
                toast.error('Item not found');
                return;
            }

            if (!selectedFile) {
                toast.error('Please select an image');
                return;
            }

            const formData = new FormData();
            formData.append('Image', selectedFile);
            formData.append('Description', `Schedule for ${selectedItem.name}`);

            if (selectedItem.type === 'teacher') {
                formData.append('LocalEmployeeNumber', String(selectedItem.id));
                await addScheduleTeacher(formData);
            } else if (selectedItem.type === 'section') {
                if (!sectionData?.gradeId || !sectionData?.sectionId) {
                    toast.error('Section data not found');
                    return;
                }
                formData.append('LocalGradeNumber', String(sectionData.gradeId));
                formData.append('LocalSectionNumber', String(sectionData.sectionId));
                await addScheduleSection(formData);
            }

            closeModal();

        } catch (error: any) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-blue-gray-100">
                    <div>
                        <h3 className="text-lg font-semibold text-dark-blue-800">Upload Image</h3>
                        <p className="text-sm text-blue-gray-500">
                            {selectedItem?.type === 'teacher' ? 'Teacher' : 'Section'}: {selectedItem?.name}
                        </p>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2 text-blue-gray-400 hover:text-dark-blue-600 hover:bg-blue-gray-50 rounded-lg transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-4">
                        {previewUrl ? (
                            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-blue-gray-50">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => {
                                        setSelectedFile(null);
                                        setPreviewUrl(null);
                                    }}
                                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                                >
                                    <FiX size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full h-48 rounded-xl border-2 border-dashed border-blue-gray-200 flex flex-col items-center justify-center bg-blue-gray-50/50">
                                <FaImage className="text-4xl text-blue-gray-300 mb-2" />
                                <p className="text-sm text-blue-gray-500">No image selected</p>
                                <p className="text-xs text-blue-gray-400">Click below to upload</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-dark-blue-700 mb-2">
                            Choose Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="block w-full text-sm text-blue-gray-500 file:border-2 file:border-dashed file:border-gray-400 file:cursor-pointer hover:file:border-gray-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:text-sm file:font-medium file:bg-dark-blue-50 file:text-dark-blue-700 transition-colors cursor-pointer"
                        />
                        <p className="text-xs text-blue-gray-400 mt-1.5">
                            Supported formats: JPG, PNG, WEBP (Max 5MB)
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 p-6 border-t border-blue-gray-100 bg-blue-gray-50/50 rounded-b-2xl">
                    <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-2.5 border-2 border-blue-gray-200 text-blue-gray-600 rounded-xl hover:bg-blue-gray-100 transition-colors font-medium text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={!selectedFile || isPending}
                        className="flex-1 px-4 py-2.5 bg-dark-blue-600 hover:bg-dark-blue-700 text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiUpload size={16} />
                        {isPending ? 'Uploading...' : 'Save Image'}
                    </button>
                </div>
            </div>
        </div>
    );
};