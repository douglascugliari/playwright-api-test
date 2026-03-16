
import { test, expect } from "../src/fixtures/apiFixture";
import { ProdutosApi } from "../src/api/produtos.api";
import * as allure from "allure-js-commons";

test.describe("Produtos", () => {

    let produtosApi: ProdutosApi;

    test.beforeEach(() => {
        produtosApi = new ProdutosApi();
    });

    test("CT-001 - Deve criar um produto", async ({ pegarToken }) => {
        const response = await produtosApi.criarProduto(pegarToken);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');

        expect(response.status()).toBe(201);
        expect(responseBody.message).toBe("Cadastro realizado com sucesso");
    });

    test("CT-002 - Deve listar todos os produtos", async ({ pegarToken }) => {
        const response = await produtosApi.listarProdutos(pegarToken);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');

        expect(response.status()).toBe(200);
        expect(responseBody.produtos).toBeInstanceOf(Array);
    });

    test("CT-003 - Deve buscar um produto por ID", async ({ pegarToken, criarProdutoFixture }) => {
        const response = await produtosApi.buscarProdutoPorId(pegarToken, criarProdutoFixture._id);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');

        expect(response.status()).toBe(200);
        expect(responseBody._id).toBe(criarProdutoFixture._id);
    });

    test("CT-004 - Deve editar um produto", async ({ pegarToken, pegarProdutoPorId }) => {
        const response = await produtosApi.atualizarProduto(pegarToken, pegarProdutoPorId._id);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');

        expect(response.status()).toBe(200);
        expect(responseBody.message).toBe("Registro alterado com sucesso");
    });
});