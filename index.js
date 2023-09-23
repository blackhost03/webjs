const { Client } = require('pg');

async function connectToDatabase() {
  const client = new Client({
    user: 'rizz',
    host: 'ck6kv31i0euc73dad81g-a.singapore-postgres.render.com',
    database: 'scvpn',
    password: 'lrbWWYHu9ObB8xlmth5DUqiURKzvImHi',
    port: 5432,
    timeout: 10000, // 10 seconds
  });

  await client.connect();

  return client;
}

async function main() {
  const client = await connectToDatabase();

  const result = await client.query('SELECT * FROM data_table');

  const rows = result.rows;

  if (rows.length > 0) {
    console.log(rows.map((row) => `### ${row.tag} ${row.date_exp} ${row.ip_address} ON ${row.upline}`).join('\n'));
  } else {
    console.log('Tidak ada data ditemukan.');
  }

  client.end();
}

main();
