import DataSource from "../datasource/jsonDBDatasource.js";

const ds = new DataSource();

export default class ContactsService {
    getAll = () => {
        return ds.getAll();
    };

    getOne = (id) => {
        return ds.getById(id);
    }

    create = (payload) => {
        return ds.create(payload);
    }

    update = (id, payload) => {
        return ds.update(id, payload);
    }

    delete = (id) => {
        return ds.delete(id);
    }

}