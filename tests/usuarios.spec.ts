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
        const response = await usuariosApi.criarUsuario();
        await allure.attachment('response', JSON.stringify(await response.json(), null, 2), 'application/json');

        expect(response.status()).toBe(201);
    });

    test("CT-002 - Deve listar usuários", async () => {
        const response = await usuariosApi.listarUsuarios();
        const usuarios = await response.json();
        await allure.attachment('response', JSON.stringify(usuarios, null, 2), 'application/json');

        expect(response.ok()).toBeTruthy();
        expect(usuarios.usuarios.length).toBeGreaterThan(0);
    });

    test("CT-003 - Deve obter um usuário por ID", async ({ criarUsuarioFixture }) => {
        const response = await usuariosApi.obterUsuarioPorId(criarUsuarioFixture._id);
        await allure.attachment('response', JSON.stringify(await response.json(), null, 2), 'application/json');

        expect(response.ok()).toBeTruthy();
    });

    test("CT-004 - Deve atualizar um usuário", async ({ criarUsuarioFixture }) => {
        const usuarioAtualizado = UsuarioFactory.criarUsuario();
        const response = await usuariosApi.atualizarUsuario(criarUsuarioFixture._id, usuarioAtualizado);
        await allure.attachment('response', JSON.stringify(await response.json(), null, 2), 'application/json');

        expect(response.ok()).toBeTruthy();
    });

    test("CT-005 - Deve deletar um usuário", async ({ criarUsuarioFixture }) => {
        const response = await usuariosApi.deletarUsuario(criarUsuarioFixture._id);
        await allure.attachment('response', JSON.stringify(await response.json(), null, 2), 'application/json');

        expect(response.ok()).toBeTruthy();
    });
});