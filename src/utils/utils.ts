export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') {
        return error;
    }

    if (error.response?.data) {
        const data = error.response.data;
        
        if (typeof data === 'string') {
            return data;
        }

        if (data.errors) {
            const errorMessages: string[] = [];
            

            Object.values(data.errors).forEach((fieldErrors: any) => {
                if (Array.isArray(fieldErrors)) {
                    // Flatten all error messages
                    fieldErrors.forEach((msg: string) => {
                        if (typeof msg === 'string') {
                            errorMessages.push(msg);
                        }
                    });
                } else if (typeof fieldErrors === 'string') {
                    errorMessages.push(fieldErrors);
                }
            });
            
            if (errorMessages.length > 0) {
                return errorMessages.join('. ');
            }
        }
        
        if (data.message) return data.message;
        if (data.error) return data.error;
        if (data.title) return data.title;
        if (data.detail) return data.detail;
        
        if (Array.isArray(data)) {
            return data.map((e: any) => e.message || e).join(', ');
        }
        
        try {
            return JSON.stringify(data);
        } catch {
            return 'An error occurred';
        }
    }

    if (error.message) {
        return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
};