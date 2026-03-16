import { test, expect } from "../src/fixtures/apiFixture";
import { LoginApi } from "../src/api/login.api";
import { UsuarioFactory } from "../src/factories/usuario.factory";


test.describe("Login", () => {

    let loginApi: LoginApi;

    test.beforeEach(() => {
        loginApi = new LoginApi();
    });

    test("Deve fazer login com sucesso", async ({ pegarUsuarioPorId }) => {
        const { email, password } = pegarUsuarioPorId;
        const response = await loginApi.fazerLogin(email, password);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.authorization).toBeDefined();
        expect(responseBody.message).toBe("Login realizado com sucesso");
    });

    test("Deve falhar login com senha incorreta", async ({ pegarUsuarioPorId }) => {
        const { email } = pegarUsuarioPorId;
        const response = await loginApi.fazerLogin(email, "senha-incorreta");
        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Email e/ou senha inválidos");
    });

    test("Deve falhar login com email não cadastrado", async () => {
        const { email, password } = UsuarioFactory.criarUsuario();
        const response = await loginApi.fazerLogin(email, password);
        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Email e/ou senha inválidos");
    });
});