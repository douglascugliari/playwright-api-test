import { apiClient } from "./apiClient";
import { ProdutoFactory } from "../factories/produto.factory";


export class ProdutosApi {

    async criarProduto(token: string) {
        const client = await apiClient(token);
        const response = await client.post('/produtos', {
            data: ProdutoFactory.criarProduto()
        });
        return response;
    }

    async listarProdutos(token: string) {
        const client = await apiClient(token);
        const response = await client.get('/produtos');
        return response;
    }

    async buscarProdutoPorId(token: string, id: string) {
        const client = await apiClient(token);
        const response = await client.get(`/produtos/${id}`);
        return response;
    }

    async atualizarProduto(token: string, id: string) {
        const client = await apiClient(token);
        const response = await client.put(`/produtos/${id}`, {
            data: ProdutoFactory.criarProduto()
        });
        return response;
    }
}
