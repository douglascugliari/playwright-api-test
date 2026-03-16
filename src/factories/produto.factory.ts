import { faker } from '@faker-js/faker';

export class ProdutoFactory {
    static criarProduto() {
        return {
            nome: faker.commerce.productName(),
            preco: faker.commerce.price({ min: 10, max: 1000, dec: 0 }),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100, multipleOf: 1 })
        };
    }
}