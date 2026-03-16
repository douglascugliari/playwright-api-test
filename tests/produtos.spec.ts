
import { test, expect } from "../src/fixtures/apiFixture";
import { ProdutosApi } from "../src/api/produtos.api";

test.describe("Produtos", () => {

    let produtosApi: ProdutosApi;

    test.beforeEach(() => {
        produtosApi = new ProdutosApi();
    });

    test("CT-001 - Deve criar um produto", async ({ pegarToken }) => {
        const response = await produtosApi.criarProduto(pegarToken);
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Cadastro realizado com sucesso");
    });

    test("CT-002 - Deve listar todos os produtos", async ({ pegarToken }) => {
        const response = await produtosApi.listarProdutos(pegarToken);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.produtos).toBeInstanceOf(Array);
    });

    test("CT-003 - Deve buscar um produto por ID", async ({ pegarToken, criarProdutoFixture }) => {
        const response = await produtosApi.buscarProdutoPorId(pegarToken, criarProdutoFixture._id);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody._id).toBe(criarProdutoFixture._id);
    });

    test("CT-004 - Deve editar um produto", async ({ pegarToken, pegarProdutoPorId }) => {
        const response = await produtosApi.atualizarProduto(pegarToken, pegarProdutoPorId._id);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Registro alterado com sucesso");
    });
});