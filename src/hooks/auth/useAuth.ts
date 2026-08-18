import { useMutation } from "@tanstack/react-query"
import { auth } from "../../api/apiClient"
import type { LoginData } from "../../type/auth.type"

export const useLogin = () =>{
    return useMutation({
        mutationFn: async(data: LoginData) =>{
            const response = await auth.login(data);
            return response.data;
        }
    })
}