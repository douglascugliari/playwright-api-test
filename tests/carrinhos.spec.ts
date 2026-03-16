import { test, expect } from "../src/fixtures/apiFixture";
import { CarrinhosApi } from "../src/api/carrinhos.api";

test.describe("Carrinhos", () => {

    let carrinhosApi: CarrinhosApi;

    test.beforeEach(() => {
        carrinhosApi = new CarrinhosApi();
    });

    test("CT-001 - Deve cadastrar um carrinho com sucesso", async ({ pegarProdutoPorId, pegarToken }) => {
        const { _id: produtoId } = pegarProdutoPorId;
        const token = pegarToken;

        const response = await carrinhosApi.cadastrarCarrinho(produtoId, token);
        expect(response.status()).toBe(201);
        expect((await response.json()).message).toBe("Cadastro realizado com sucesso");
    });

    test("CT-002 - Deve listar carrinhos com sucesso", async ({ pegarToken }) => {
        const token = pegarToken;

        const response = await carrinhosApi.listarCarrinhos(token);
        expect(response.status()).toBe(200);
        expect((await response.json()).carrinhos.length).toBeGreaterThan(0);
    });

    test("CT-003 - Deve buscar carrinho por ID com sucesso", async ({ pegarToken, pegarCarrinhoPorId }) => {
        const token = pegarToken;

        const response = await carrinhosApi.buscarCarrinhoPorId(token, pegarCarrinhoPorId._id);
        expect(response.status()).toBe(200);
        expect((await response.json())._id).toBe(pegarCarrinhoPorId._id);
    });
});