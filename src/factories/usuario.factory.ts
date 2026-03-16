import { faker } from '@faker-js/faker';

export class UsuarioFactory {
    static criarUsuario() {
        return {
            nome: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: "true"
        };
    }
}