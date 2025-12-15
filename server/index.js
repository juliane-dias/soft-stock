import express from "express";
import cors from "cors";
import pool from "./db-config.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

//  GET produtos (alterado para usar alias)
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        nome      AS name,
        categoria AS category,
        preco     AS price,
        estoque   AS qty
      FROM produtos
      ORDER BY id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// POST produto (alterado para corresponder ao banco de dados)
app.post("/products", async (req, res) => {
  const { name, category, price, qty } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO produtos (nome, categoria, preco, estoque)
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        nome      AS name,
        categoria AS category,
        preco     AS price,
        estoque   AS qty
      `,
      [name, category, price, qty]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir produto" });
  }
});

// PUT - atualizar produto
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, qty } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE produtos
      SET
        nome = $1,
        categoria = $2,
        preco = $3,
        estoque = $4
      WHERE id = $5
      RETURNING
        id,
        nome      AS name,
        categoria AS category,
        preco     AS price,
        estoque   AS qty
      `,
      [name, category, price, qty, id]
    );

    // se não achou o produto
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});


// DELETE produto
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM produtos WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server backend rodando em http://localhost:${PORT}`);
});
