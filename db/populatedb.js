#! /usr/bin/env node
const { Client } = require("pg");
require('dotenv').config();

const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message text,
    username varchar(60) NOT NULL,
    date timestamp(0) default current_timestamp
);

INSERT INTO messages (message, username, date) 
VALUES
  ('first', 'johnny', '2024-08-27 09:00:00');

  INSERT INTO messages (message, username) 
VALUES
  ('second', 'johnny');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
