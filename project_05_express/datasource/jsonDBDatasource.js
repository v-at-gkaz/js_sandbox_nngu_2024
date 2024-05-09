import * as path from 'node:path';
import * as fs from 'node:fs';
import { argv } from 'node:process';
const __dirname = path.dirname(argv[1]);

const DBFile = path.join(__dirname, 'datasource', 'DB.json');
export default class DataSource {

    dbFile = '';
    db = [];

    constructor() {
        this.dbFile = DBFile;
        this.init();
    }

    getAll() {
        return this.db;
    }

    getById(id) {
        return this.db.find(item=> item.id === +id);
    }

    delete(id) {
        this.db = this.db.filter( item=> item.id !== +id);
        this.saveToDisk();
        return null;
    }

    create(payload) {
        const newPayload = { ...payload, id: Date.now() };
        this.db.push(newPayload);
        this.saveToDisk();
        return newPayload;
    }

    update(id, payload) {

        const found = { ...this.getById(id) };

       console.log('found', found);

        for (const key in found) {
                if(payload[key]){
                    found[key] = payload[key];
                }
        }

        console.log('found (updated)', found);

        this.delete(id);
        this.db.push(found);
        this.saveToDisk();
        return found;
    }

    init() {
        if(fs.existsSync(this.dbFile)){
            try {
                this.db = JSON.parse(fs.readFileSync(this.dbFile));
                this.saveToDisk();
            } catch (e) {
                this.db = [];
                this.saveToDisk();
            }

        } else {
           this.saveToDisk();
        }
    }

    saveToDisk() {
        fs.writeFileSync(this.dbFile, JSON.stringify(this.db));
    }
}