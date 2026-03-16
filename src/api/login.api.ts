import { apiClient } from "./apiClient";


export class LoginApi {

    async fazerLogin(email: string, password: string) {
        const client = await apiClient();
        const response = await client.post('/login', {
            data: {
                email: email,
                password: password
            }
        });
        return response;
    }
}
