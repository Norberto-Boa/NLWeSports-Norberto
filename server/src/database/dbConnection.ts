import sqlServer from 'mssql';

const sqlConfig = {
  user: "anytechdb",
  password: "anytechonetwo",
  database: "esportsdb",
  server: "esportsdb.cx0hlf0nr9mz.us-east-1.rds.amazonaws.com",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

async () => {
  try {
    await sqlServer.connect(sqlConfig);


  } catch (err) {
    console.log(err)
  }
}