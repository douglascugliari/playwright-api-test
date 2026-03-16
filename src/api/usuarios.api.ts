
import { apiClient } from "./apiClient";
import { UsuarioFactory } from "../factories/usuario.factory";

export class UsuariosApi {

    async criarUsuario() {
        const client = await apiClient();
        const response = await client.post('/usuarios', {
            data: UsuarioFactory.criarUsuario()
        });
        return response;
    }

    async listarUsuarios() {
        const client = await apiClient();
        const response = await client.get('/usuarios');
        return response;
    }

    async obterUsuarioPorId(id: string) {
        const client = await apiClient();
        const response = await client.get(`/usuarios/${id}`);
        return response;
    }

    async atualizarUsuario(id: string, data: any) {
        const client = await apiClient();
        const response = await client.put(`/usuarios/${id}`, { data });
        return response;
    }

    async deletarUsuario(id: string) {
        const client = await apiClient();
        const response = await client.delete(`/usuarios/${id}`);
        return response;
    }

}

