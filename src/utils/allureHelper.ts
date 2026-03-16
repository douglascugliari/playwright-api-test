import * as allure from 'allure-js-commons';

export async function attachJSON(name: string, data: any) {

    await allure.attachment(
        name,
        JSON.stringify(data, null, 2),
        'application/json'
    );

}