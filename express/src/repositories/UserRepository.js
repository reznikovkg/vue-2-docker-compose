export default class UserRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getLeadersWithUser(userId) {
        return new Promise((resolve,reject) =>{
            this.dbConnection.all(`
        WITH ranking AS (
        SELECT ROW_NUMBER() OVER (ORDER BY games_win DESC, user_id ASC, username ASC) as position, user_id, username, games_win
        FROM users
        ) 
        SELECT * FROM ranking WHERE user_id = ?
        UNION
        SELECT * FROM (SELECT * FROM ranking LIMIT 10) ` 
        ,[userId], (err,users) =>{
                if (err) 
                    reject(err);
                resolve(users);
            })
        })
    }

    async getUserById(id) {
        return new Promise((resolve, reject) => {
            this.dbConnection.get('SELECT * FROM users WHERE user_id = ?', [id], (err, user) => {
                if (err)
                    reject(err);
                resolve(user);
            })
        })
    }

    async addUser(user_id, username) {
        return new Promise((resolve, reject) => {
            this.dbConnection.run('INSERT INTO users (user_id, username, games_win) VALUES (?,?,?)', [user_id, username, 0], (err) => {
                if (err)
                    reject(err);
                resolve();
            })
        })
    }

    async updateUserScore(id) {
        return new Promise((resolve, reject) => {
            this.dbConnection.run('UPDATE users set games_win = games_win + 1 WHERE user_id = ?', [id], (err, user) => {
                if (err)
                    reject(err);
                resolve(user);
            })
        })
    }
}
