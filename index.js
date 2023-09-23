const { Client } = require('pg');

const client = new Client({
  user: 'rizz',
  host: 'ck6kv31i0euc73dad81g-a.singapore-postgres.render.com',
  database: 'scvpn',
  password: 'lrbWWYHu9ObB8xlmth5DUqiURKzvImHi',
  port: 5432,
});

client.connect();

client.query('SELECT * FROM data_table', (err, result) => {
  if (err) {
    console.error('Koneksi database gagal:', err);
  } else {
    const rows = result.rows;
    if (rows.length > 0) {
      rows.forEach((row) => {
        console.log(`### ${row.tag} ${row.date_exp} ${row.ip_address} ON ${row.upline}`);
      });
    } else {
      console.log('Tidak ada data ditemukan.');
    }
    client.end();
  }
});
