import { test as base } from '@playwright/test';
import { UsuariosApi } from '../api/usuarios.api';
import { LoginApi } from '../api/login.api';
import { ProdutosApi } from '../api/produtos.api';
import { CarrinhosApi } from '../api/carrinhos.api';

interface UsuarioResponse {
    _id: string;
    nome: string;
    email: string;
    password: string;
    administrador: string;
}

interface ProdutoResponse {
    _id: string;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
}

interface LoginResponse {
    message: string;
    authorization: string;
}

interface CadastrarCarrinhoResponse {
    message: string;
    _id: string;
}

interface CarrinhoResponse {
    produtos: any[];
    precoTotal: number;
    quantidadeTotal: number;
    _id: string;
    idUsuario: string;
}

type ApiFixture = {
    usuariosApi: UsuariosApi;
    criarUsuarioFixture: UsuarioResponse;
    pegarUsuarioPorId: UsuarioResponse;
    pegarToken: string;
    loginApi: LoginApi;
    criarProdutoFixture: ProdutoResponse;
    produtosApi: ProdutosApi;
    pegarProdutoPorId: ProdutoResponse;
    carrinhosApi: CarrinhosApi;
    criarCarrinhoFixture: CadastrarCarrinhoResponse;
    pegarCarrinhoPorId: CarrinhoResponse;

};

export const test = base.extend<ApiFixture>({
    usuariosApi: async ({ }, use) => {
        const usuariosApi = new UsuariosApi();
        await use(usuariosApi);
    },

    loginApi: async ({ }, use) => {
        const loginApi = new LoginApi();
        await use(loginApi);
    },

    produtosApi: async ({ }, use) => {
        const produtosApi = new ProdutosApi();
        await use(produtosApi);
    },

    carrinhosApi: async ({ }, use) => {
        const carrinhosApi = new CarrinhosApi();
        await use(carrinhosApi);
    },

    criarUsuarioFixture: async ({ usuariosApi }, use) => {
        const response = await usuariosApi.criarUsuario();

        if (!response.ok()) {
            throw new Error(`Falha ao criar usuário: ${response.status()}`);
        }

        const responseBody = await response.json() as UsuarioResponse;

        if (!responseBody._id) {
            throw new Error('Resposta da API não contém ID do usuário');
        }

        await use(responseBody);
    },

    pegarUsuarioPorId: async ({ usuariosApi, criarUsuarioFixture }, use) => {
        if (!criarUsuarioFixture._id) {
            throw new Error('ID do usuário não disponível');
        }

        const response = await usuariosApi.obterUsuarioPorId(criarUsuarioFixture._id);

        if (!response.ok()) {
            throw new Error(`Falha ao obter usuário: ${response.status()}`);
        }

        const responseBody = await response.json() as UsuarioResponse;

        await use(responseBody);
    },

    pegarToken: async ({ loginApi, pegarUsuarioPorId }, use) => {
        const response = await loginApi.fazerLogin(pegarUsuarioPorId.email, pegarUsuarioPorId.password);

        if (!response.ok()) {
            throw new Error(`Falha ao fazer login: ${response.status()}`);
        }

        const responseBody = await response.json() as LoginResponse;
        const token = responseBody.authorization.split(' ')[1];

        await use(token);
    },

    criarProdutoFixture: async ({ produtosApi, pegarToken }, use) => {
        const response = await produtosApi.criarProduto(pegarToken);

        if (!response.ok()) {
            throw new Error(`Falha ao criar produto: ${response.status()}`);
        }

        const responseBody = await response.json() as ProdutoResponse;

        await use(responseBody);
    },

    pegarProdutoPorId: async ({ produtosApi, criarProdutoFixture, pegarToken }, use) => {
        if (!criarProdutoFixture._id) {
            throw new Error('ID do produto não disponível');
        }

        const response = await produtosApi.buscarProdutoPorId(pegarToken, criarProdutoFixture._id);

        if (!response.ok()) {
            throw new Error(`Falha ao obter produto: ${response.status()}`);
        }

        const responseBody = await response.json() as ProdutoResponse;

        await use(responseBody);
    },

    criarCarrinhoFixture: async ({ carrinhosApi, pegarToken, pegarProdutoPorId }, use) => {
        const response = await carrinhosApi.cadastrarCarrinho(pegarProdutoPorId._id, pegarToken);

        if (!response.ok()) {
            throw new Error(`Falha ao criar carrinho: ${response.status()}`);
        }

        const responseBody = await response.json() as CadastrarCarrinhoResponse;

        await use(responseBody);
    },

    pegarCarrinhoPorId: async ({ carrinhosApi, criarCarrinhoFixture, pegarToken }, use) => {
        if (!criarCarrinhoFixture._id) {
            throw new Error('ID do carrinho não disponível');
        }

        const response = await carrinhosApi.buscarCarrinhoPorId(pegarToken, criarCarrinhoFixture._id);

        if (!response.ok()) {
            throw new Error(`Falha ao obter carrinho: ${response.status()}`);
        }

        const responseBody = await response.json() as CarrinhoResponse;

        await use(responseBody);
    },

});

export const expect = test.expect;