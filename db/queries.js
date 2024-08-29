const pool = require("./pool");

exports.getAllMessages = async () => {
    const { rows } = await pool.query(
        `SELECT *, to_char(date, 'YYYY-MM-DD HH24:MI') as date_formatted,
        to_char(date, 'YYYY-MM-DD') as date_only,
        to_char(date, 'HH24:MI') as time_only
         FROM messages`
    );
    return rows;
}

exports.insertMessage = async (username, message) => {
    await pool.query("INSERT INTO messages (username, message) VALUES($1, $2)", [username,message]);
}