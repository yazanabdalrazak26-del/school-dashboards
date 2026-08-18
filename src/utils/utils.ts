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
        
        if (data.message) return data.message;
        if (data.error) return data.error;
        if (data.title) return data.title;
        if (data.detail) return data.detail;
        
        if (Array.isArray(data)) {
            return data.map((e: any) => e.message || e).join(', ');
        }
        
        if (data.errors) {
            const errors = Object.values(data.errors).flat();
            return errors.join(', ');
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