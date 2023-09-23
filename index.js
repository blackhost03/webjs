const { Client } = require('pg');

const client = new Client({
  user: 'rizz',
  host: 'ck6kv31i0euc73dad81g-a.singapore-postgres.render.com',
  database: 'scvpn',
  password: 'lrbWWYHu9ObB8xlmth5DUqiURKzvImHi',
  port: 5432,
  timeout: 10000, // 10 seconds
});

client.connect();

try {
  const result = await client.query('SELECT * FROM data_table');
  const rows = result.rows;

  if (rows.length > 0) {
    console.log(rows.map((row) => `### ${row.tag} ${row.date_exp} ${row.ip_address} ON ${row.upline}`).join('\n'));
  } else {
    console.log('Tidak ada data ditemukan.');
  }
} catch (err) {
  console.error('Koneksi database gagal:', err);
} finally {
  client.end();
}
