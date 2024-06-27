import db from "./databaseService.js";

export default class CustomersService {
    getAll = async () => {
        try {
            return {
                status: 'success',
                data: await db.Customer.findAll()
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    };

    getOne = async (id) => {
        try {
            return {
                status: 'success',
                data: await db.Customer.findByPk(id)
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

    create = async (payload) => {
        if (!(payload.name && payload.email)) {
            return {
                status: 'validation error',
                data: {error: 'wrong data to create'}
            };
        }

        try {
            return {
                status: 'success',
                data: await db.Customer.create(payload)
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

    update = async (id, payload) => {

        if (!(payload.name || payload.email)) {
            return {
                status: 'validation error',
                data: {error: 'wrong data to update'}
            };
        }

        try {
            return {
                status: 'success',
                data: await db.Customer.update(payload, {where: {id}})
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

    delete = async (id) => {
        try {
            await db.Customer.destroy({where: {id}});
            return {
                status: 'success'
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

}