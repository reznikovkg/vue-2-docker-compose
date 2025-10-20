import sqlite3 from 'sqlite3';

const connection = new sqlite3.Database("src/database/tg-app.sqlite");

export default connection
