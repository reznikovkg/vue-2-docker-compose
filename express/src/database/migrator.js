import sqlite3 from 'sqlite3';
import { CommandsRunner, SQLite3Driver } from 'node-db-migration';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

var db = new sqlite3.Database('src/database/tg-app.sqlite');
let migrations = new CommandsRunner({
    driver: new SQLite3Driver(db),
    directoryWithScripts: dirname(fileURLToPath(import.meta.url)) + '/migrations',
});
console.log('migration = ' + migrations);
migrations.run(process.argv[2]) 