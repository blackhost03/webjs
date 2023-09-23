const { Client } = require("pg");
const express = require("express");

const host = "ck6kv31i0euc73dad81g-a.singapore-postgres.render.com"; // Ganti dengan alamat host PostgreSQL Anda
const port = "5432"; // Port default PostgreSQL
const username = "rizz"; // Ganti dengan username PostgreSQL Anda
const password = "lrbWWYHu9ObB8xlmth5DUqiURKzvImHi"; // Ganti dengan password PostgreSQL Anda
const database = "scvpn"; // Ganti dengan nama database PostgreSQL Anda

const client = new Client({
  host,
  port,
  user: username,
  password,
  database,
});

client.connect();

const app = express();

app.get("/", async (req, res) => {
  const query = `SELECT * FROM data_table`;
  const result = await client.query(query);

  if (result.rowCount > 0) {
    const rows = [];
    for await (const row of result) {
      rows.push({
        tag: row.tag,
        dateExp: row.date_exp,
        ipAddress: row.ip_address,
        upline: row.upline,
      });
    }

    const response = [];
    for (const row of rows) {
      response.push(`### ${row.tag} ${row.dateExp} ${row.ipAddress} ON ${row.upline}`);
    }
    res.send(response.join('\n'));
  } else {
    res.status(404).json({ message: "Tidak ada data ditemukan." });
  }
});

app.listen(8080, () => {
  console.log("Server is listening on port 80");
});
