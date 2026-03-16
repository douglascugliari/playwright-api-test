import { test, expect } from "../src/fixtures/apiFixture";
import { UsuariosApi } from "../src/api/usuarios.api";
import { UsuarioFactory } from "../src/factories/usuario.factory";
import * as allure from "allure-js-commons";

test.describe("Usuários", () => {

    let usuariosApi: UsuariosApi;

    test.beforeEach(() => {
        usuariosApi = new UsuariosApi();
    });

    test("CT-001 - Deve criar um usuário", async () => {
        await allure.description("Este teste verifica se é possível criar um usuário");
        await allure.feature("Usuários");
        await allure.tags("usuarios", "criacao");
        const response = await usuariosApi.criarUsuario();
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');

        expect(response.status()).toBe(201);
    });

    test("CT-002 - Deve listar usuários", async () => {
        await allure.description("Este teste verifica se é possível listar usuários");
        await allure.feature("Usuários");
        await allure.tags("usuarios", "listagem");
        const response = await usuariosApi.listarUsuarios();
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');
        expect(response.ok()).toBeTruthy();

        const usuarios = await response.json();
        expect(usuarios.usuarios.length).toBeGreaterThan(0);
    });

    test("CT-003 - Deve obter um usuário por ID", async ({ criarUsuarioFixture }) => {
        await allure.description("Este teste verifica se é possível obter um usuário por ID");
        await allure.feature("Usuários");
        await allure.tags("usuarios", "busca");
        const response = await usuariosApi.obterUsuarioPorId(criarUsuarioFixture._id);
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');
        expect(response.ok()).toBeTruthy();
    });

    test("CT-004 - Deve atualizar um usuário", async ({ criarUsuarioFixture }) => {
        await allure.description("Este teste verifica se é possível atualizar um usuário");
        await allure.feature("Usuários");
        await allure.tags("usuarios", "edicao");
        const usuarioAtualizado = UsuarioFactory.criarUsuario();
        const response = await usuariosApi.atualizarUsuario(criarUsuarioFixture._id, usuarioAtualizado);
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');
        expect(response.ok()).toBeTruthy();
    });

    test("CT-005 - Deve deletar um usuário", async ({ criarUsuarioFixture }) => {
        await allure.description("Este teste verifica se é possível deletar um usuário");
        await allure.feature("Usuários");
        await allure.tags("usuarios", "delecao");
        const response = await usuariosApi.deletarUsuario(criarUsuarioFixture._id);
        await allure.attachment('response', JSON.stringify(response, null, 2), 'application/json');
        expect(response.ok()).toBeTruthy();
    });
});