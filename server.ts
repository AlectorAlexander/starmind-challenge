import express from "express"
import cors from "cors"
import "dotenv/config"
import fs from "fs"

const app = express()
app.use(cors())
app.use(express.json())

const initializeAI = async () => {
  try {
    const products = JSON.parse(fs.readFileSync("./public/itens.json", "utf8"))
    const initPrompt = `Você é um atendente especializado na loja diRavena.
    Responda sempre em português, de forma breve, objetiva e cordial.
    Use APENAS as informações do produto fornecidas no contexto.
    Se não houver dado no contexto, diga que não possui essa informação.

Produtos disponíveis:
${JSON.stringify(products, null, 2)}

Se você entendeu as instruções, responda apenas: "Estou pronto para responder as perguntas"`

    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: initPrompt }]
      })
    })

    const data = await resp.json()
    if (resp.ok) {
      console.log("IA:", data.choices[0].message.content)
    } else {
      console.log("Erro ao inicializar IA:", data)
    }
  } catch (err) {
    console.log("Erro ao inicializar IA:", err.message)
  }
}

app.post("/api/ask", async (req, res) => {
  const { question } = req.body
  if (!question) {
    return res.status(400).json({ error: "Pergunta não informada" })
  }

  try {
    const products = JSON.parse(fs.readFileSync("./public/itens.json", "utf8"))
    const prompt = `Você é um atendente especializado na loja diRavena.
    Responda sempre em português, de forma breve, objetiva e cordial.
    Use APENAS as informações do produto fornecidas no contexto.
    Se não houver dado no contexto, diga que não possui essa informação.

Produtos disponíveis:
${JSON.stringify(products, null, 2)}

Pergunta do cliente:
"${question}"

Responda em até 3 frases, sem inventar detalhes.`

    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    })

    const data = await resp.json()
    if (!resp.ok) {
      return res.status(resp.status).json(data)
    }

    return res.json({ answer: data.choices[0].message.content })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  initializeAI()
})
