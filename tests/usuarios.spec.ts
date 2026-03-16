import { test, expect } from "../src/fixtures/apiFixture";
import { UsuariosApi } from "../src/api/usuarios.api";
import { UsuarioFactory } from "../src/factories/usuario.factory";

test.describe("Usuários", () => {

    let usuariosApi: UsuariosApi;

    test.beforeEach(() => {
        usuariosApi = new UsuariosApi();
    });

    test("CT-001 - Deve criar um usuário", async () => {
        const response = await usuariosApi.criarUsuario();

        expect(response.status()).toBe(201);
    });

    test("CT-002 - Deve listar usuários", async () => {
        const response = await usuariosApi.listarUsuarios();
        expect(response.ok()).toBeTruthy();

        const usuarios = await response.json();
        expect(usuarios.usuarios.length).toBeGreaterThan(0);
    });

    test("CT-003 - Deve obter um usuário por ID", async ({ criarUsuarioFixture }) => {
        const response = await usuariosApi.obterUsuarioPorId(criarUsuarioFixture._id);
        expect(response.ok()).toBeTruthy();
    });

    test("CT-004 - Deve atualizar um usuário", async ({ criarUsuarioFixture }) => {
        const usuarioAtualizado = UsuarioFactory.criarUsuario();
        const response = await usuariosApi.atualizarUsuario(criarUsuarioFixture._id, usuarioAtualizado);

        expect(response.ok()).toBeTruthy();
    });

    test("CT-005 - Deve deletar um usuário", async ({ criarUsuarioFixture }) => {
        const response = await usuariosApi.deletarUsuario(criarUsuarioFixture._id);

        expect(response.ok()).toBeTruthy();
    });
});