
import { apiClient } from "./apiClient";

export class CarrinhosApi {

    async cadastrarCarrinho(produtoId: string, token: string) {
        const client = await apiClient(token);
        const response = await client.post('/carrinhos', {
            data: {
                produtos: [
                    {
                        idProduto: produtoId,
                        quantidade: 1
                    }
                ]
            }
        });
        return response;
    }

    async listarCarrinhos(token: string) {
        const client = await apiClient(token);
        const response = await client.get('/carrinhos');
        return response;
    }

    async buscarCarrinhoPorId(token: string, id: string) {
        const client = await apiClient(token);
        const response = await client.get(`/carrinhos/${id}`);
        return response;
    }
}
