import { test, expect } from "../src/fixtures/apiFixture";
import { CarrinhosApi } from "../src/api/carrinhos.api";
import * as allure from "allure-js-commons";
import { attachJSON } from "../src/utils/allureHelper";

test.describe("Carrinhos", () => {

    let carrinhosApi: CarrinhosApi;

    test.beforeEach(() => {
        carrinhosApi = new CarrinhosApi();
    });

    test("CT-001 - Deve cadastrar um carrinho com sucesso", async ({ pegarProdutoPorId, pegarToken }) => {
        await allure.description("Este teste verifica se é possível cadastrar um carrinho com sucesso");
        await allure.feature("Carrinhos");
        await allure.tags("carrinhos", "cadastro");
        const { _id: produtoId } = pegarProdutoPorId;
        const token = pegarToken;

        const response = await carrinhosApi.cadastrarCarrinho(produtoId, token);
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');
        expect(response.status()).toBe(201);
        expect((await response.json()).message).toBe("Cadastro realizado com sucesso");

    });

    test("CT-002 - Deve listar carrinhos com sucesso", async ({ pegarToken }) => {
        await allure.description("Este teste verifica se é possível listar carrinhos com sucesso");
        await allure.feature("Carrinhos");
        await allure.tags("carrinhos", "listagem");
        const token = pegarToken;

        const response = await carrinhosApi.listarCarrinhos(token);
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');
        expect(response.status()).toBe(200);
        expect((await response.json()).carrinhos.length).toBeGreaterThan(0);
    });

    test("CT-003 - Deve buscar carrinho por ID com sucesso", async ({ pegarToken, pegarCarrinhoPorId }) => {
        await allure.description("Este teste verifica se é possível buscar um carrinho por ID com sucesso");
        await allure.feature("Carrinhos");
        await allure.tags("carrinhos", "busca");
        const token = pegarToken;

        const response = await carrinhosApi.buscarCarrinhoPorId(token, pegarCarrinhoPorId._id);
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');
        expect(response.status()).toBe(200);
        expect((await response.json())._id).toBe(pegarCarrinhoPorId._id);
    });
});