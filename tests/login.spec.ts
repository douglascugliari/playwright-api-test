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
        await allure.description("Este teste verifica se é possível fazer login com sucesso");
        await allure.feature("Login");
        await allure.tags("login", "sucesso");
        const { email, password } = pegarUsuarioPorId;
        const response = await loginApi.fazerLogin(email, password);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');
        expect(responseBody.authorization).toBeDefined();
        expect(responseBody.message).toBe("Login realizado com sucesso");
    });

    test("Deve falhar login com senha incorreta", async ({ pegarUsuarioPorId }) => {
        await allure.description("Este teste verifica se é possível falhar login com senha incorreta");
        await allure.feature("Login");
        await allure.tags("login", "falha");
        const { email } = pegarUsuarioPorId;
        const response = await loginApi.fazerLogin(email, "senha-incorreta");
        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');
        expect(responseBody.message).toBe("Email e/ou senha inválidos");
    });

    test("Deve falhar login com email não cadastrado", async () => {
        await allure.description("Este teste verifica se é possível falhar login com email não cadastrado");
        await allure.feature("Login");
        await allure.tags("login", "falha");
        const { email, password } = UsuarioFactory.criarUsuario();
        const response = await loginApi.fazerLogin(email, password);
        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        await allure.attachment('response', JSON.stringify(responseBody, null, 2), 'application/json');
        expect(responseBody.message).toBe("Email e/ou senha inválidos");
    });
});