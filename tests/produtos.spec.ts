
import { test, expect } from "../src/fixtures/apiFixture";
import { ProdutosApi } from "../src/api/produtos.api";
import * as allure from "allure-js-commons";

test.describe("Produtos", () => {

    let produtosApi: ProdutosApi;

    test.beforeEach(() => {
        produtosApi = new ProdutosApi();
    });

    test("CT-001 - Deve criar um produto", async ({ pegarToken }) => {
        await allure.description("Este teste verifica se é possível criar um produto");
        await allure.feature("Produtos");
        await allure.tags("produtos", "criacao");
        const response = await produtosApi.criarProduto(pegarToken);
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');
        expect(responseBody.message).toBe("Cadastro realizado com sucesso");
    });

    test("CT-002 - Deve listar todos os produtos", async ({ pegarToken }) => {
        await allure.description("Este teste verifica se é possível listar todos os produtos");
        await allure.feature("Produtos");
        await allure.tags("produtos", "listagem");
        const response = await produtosApi.listarProdutos(pegarToken);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');
        expect(responseBody.produtos).toBeInstanceOf(Array);
    });

    test("CT-003 - Deve buscar um produto por ID", async ({ pegarToken, criarProdutoFixture }) => {
        await allure.description("Este teste verifica se é possível buscar um produto por ID");
        await allure.feature("Produtos");
        await allure.tags("produtos", "busca");
        const response = await produtosApi.buscarProdutoPorId(pegarToken, criarProdutoFixture._id);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');
        expect(responseBody._id).toBe(criarProdutoFixture._id);
    });

    test("CT-004 - Deve editar um produto", async ({ pegarToken, pegarProdutoPorId }) => {
        await allure.description("Este teste verifica se é possível editar um produto");
        await allure.feature("Produtos");
        await allure.tags("produtos", "edicao");
        const response = await produtosApi.atualizarProduto(pegarToken, pegarProdutoPorId._id);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');
        expect(responseBody.message).toBe("Registro alterado com sucesso");
    });
});