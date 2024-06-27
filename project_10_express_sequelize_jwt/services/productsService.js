import db from "./databaseService.js";

export default class ProductsService {
    getAll = async () => {
        try {
            // const resp = await db.sequelize.query('select * from products order by id asc;');
            // return {
            //     status: 'success',
            //     data: resp[0]
            // };
            return {
                status: 'success',
                data: await db.Product.findAll()
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
            /*const resp = await db.sequelize.query(`select * from products where id = ${+id};`);
            return {
                status: 'success',
                data: resp[0][0]
            };*/
            return {
                status: 'success',
                //data: await db.Product.findByPk(id)
                data: await db.Product.findOne({where: {id}})
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

    create = async (payload) => {
        if (!(payload.name && payload.price)) {
            return {
                status: 'validation error',
                data: {error: 'wrong data to create'}
            };
        }

        //let query = `insert into products (name, price) VALUES ('${payload.name}', ${payload.price})`;

        try {
            //const resp = await db.sequelize.query(query);
            // return {
            //     status: 'success',
            //     data: resp[0]
            // };
            return {
                status: 'success',
                data: await db.Product.create({name: payload.name, price: payload.price})
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

    update = async (id, payload) => {

        if(!(payload.name || payload.price)){
            return {
                status: 'validation error',
                data: {error: 'wrong data to update'}
            };
        }

        /*let setQueryPart = [];

        if(payload.name) {
            setQueryPart.push(`name='${payload.name}'`);
        }

        if(payload.price) {
            setQueryPart.push(`price=${payload.price}`);
        }

        setQueryPart = setQueryPart.join(', ');

        let query = `update products set ${setQueryPart} where id = ${+id}`;*/

        try {
            /*const resp = await db.sequelize.query(query);
            return {
                status: 'success',
                data: resp[0]
            };*/
            return {
                status: 'success',
                data: await db.Product.update(payload, { where: {id}})
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
            //await db.sequelize.query(`delete from products where id = ${+id};`);
            await db.Product.destroy({ where: {id}});
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