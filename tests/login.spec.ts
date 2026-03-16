import { test, expect } from "../src/fixtures/apiFixture";
import { LoginApi } from "../src/api/login.api";
import { UsuarioFactory } from "../src/factories/usuario.factory";
import * as allure from "allure-js-commons";


test.describe("Login", () => {

    let loginApi: LoginApi;

    test.beforeEach(() => {
        loginApi = new LoginApi();
    });

    test("Deve fazer login com sucesso", async ({ pegarUsuarioPorId }) => {
        const { email, password } = pegarUsuarioPorId;
        const response = await loginApi.fazerLogin(email, password);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');

        expect(responseBody.authorization).toBeDefined();
        expect(responseBody.message).toBe("Login realizado com sucesso");
    });

    test("Deve falhar login com senha incorreta", async ({ pegarUsuarioPorId }) => {
        const { email } = pegarUsuarioPorId;
        const response = await loginApi.fazerLogin(email, "senha-incorreta");
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');

        expect(response.status()).toBe(401);
        expect(responseBody.message).toBe("Email e/ou senha inválidos");
    });

    test("Deve falhar login com email não cadastrado", async () => {
        const { email, password } = UsuarioFactory.criarUsuario();
        const response = await loginApi.fazerLogin(email, password);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');

        expect(response.status()).toBe(401);
        expect(responseBody.message).toBe("Email e/ou senha inválidos");
    });
});