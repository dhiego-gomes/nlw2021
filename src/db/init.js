const Database = require('./config')

const initDB = {
    async init() {
        const db = await Database() // 'await' PEDE PRA O CÓDIGO ESPERAR    // AQUI INICIAMOS O DB

        await db.exec(`CREATE TABLE rooms (
                id INTEGER PRIMARY KEY,
                pass TEXT
            )`);

        await db.exec(`CREATE TABLE questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                read INT,
                room INT
            )`);

        await db.close()    // AQUI ENCERRAMOS A CONEXÃO COM O DB
    }
}

initDB.init()