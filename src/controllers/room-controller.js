const Database = require('../db/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password
        let roomID = ''
        let isRoom = true

        while (isRoom) {
            
            // GERA NÚMERO DA SALA
            for (let i = 0; i < 6; i++) {
                roomID += Math.floor(Math.random() * 10).toString()
            }
    
            // VERTIFICA SE NÚMERO DA SALA JÁ EXISTE
            const roomsExistsIDs = await db.all(`SELECT id FROM rooms`)
    
            isRoom = roomsExistsIDs.some(roomExistsID => roomExistsID === roomID)
    
            if (!isRoom) {
    
                // INSERE SALA NO BANCO
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomID)},
                    '${pass}'
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomID}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomID = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 1`)
        let isNoQuentions

        if (questions.length == 0 && questionsRead.length == 0) {
            isNoQuentions = true
        }
        
        res.render('room', { roomID, questions, questionsRead, isNoQuentions })
    },

    enter(req, res) {
        const roomID = req.body.roomID

        res.redirect(`/room/${roomID}`)
    }
}