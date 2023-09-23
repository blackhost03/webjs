const { Client } = require("pg");
const express = require("express");
const port = process.env.PORT || 3001;
const host = "satao.db.elephantsql.com"; // Sesuaikan dengan alamat host PostgreSQL Anda
const portdb = 5432; // portdb default PostgreSQL
const username = "iygeabtt"; // Sesuaikan dengan username PostgreSQL Anda
const password = "FfM_e8SSwNDXjUs_4OYGyrS4ApghMlHc"; // Sesuaikan dengan password PostgreSQL Anda
const database = "iygeabtt"; // Sesuaikan dengan nama database PostgreSQL Anda

const client = new Client({
  host,
  portdb,
  user: username,
  password,
  database,
  ssl: true,
});

client.connect();

const app = express();
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// Mendefinisikan fungsi untuk mengubah format tanggal
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Menggunakan String() dan padStart() untuk memastikan dua digit pada bulan
  const day = String(date.getDate()).padStart(2, '0'); // Menggunakan String() dan padStart() untuk memastikan dua digit pada tanggal
  return `${year}-${month}-${day}`;
}

app.get("/", async (req, res) => {
  const query = `SELECT * FROM data_table`;
  const result = await client.query(query);

  if (result.rowCount > 0) {
    const rows = [];
    for await (const row of result.rows) {
      rows.push({
        tag: row.tag,
        dateExp: formatDate(row.date_exp), // Menggunakan formatDate untuk mengubah format tanggal
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
