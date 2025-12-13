import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "123456",
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Conexão com PostgreSQL realizada com sucesso!");
    client.release();
  } catch (err) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", err.message);
  }
})();

export default pool;
