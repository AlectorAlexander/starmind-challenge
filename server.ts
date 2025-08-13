import express from "express"
import cors from "cors"
import "dotenv/config"
import fs from "fs"

const app = express()
app.use(cors())
app.use(express.json())

// Rota de teste
app.get("/api/test", (req, res) => {
  console.log("Rota de teste chamada")
  res.json({ message: "API funcionando!", timestamp: new Date().toISOString() })
})

// Carrega produtos uma vez na inicialização
const products = JSON.parse(fs.readFileSync("./public/itens.json", "utf8"))

const initializeAI = async () => {
  try {
    const initPrompt = `Você é um atendente especializado da loja diRavena.

INSTRUÇÕES IMPORTANTES:
1. Responda sempre em português, de forma cordial e útil
2. Use APENAS as informações dos produtos fornecidas abaixo
3. Quando perguntarem sobre preços, SEMPRE mencione o valor exato
4. Quando perguntarem por links ou quiserem "mais detalhes", SEMPRE forneça o URL completo do produto
5. Para comparações de preços, analise todos os produtos e dê a resposta correta
6. Seja proativo: se mencionarem um produto, já ofereça preço, parcelamento e link
7. Nunca diga que "não possui informações" se os dados estão disponíveis nos produtos

Produtos disponíveis:
${JSON.stringify(products, null, 2)}

Se entendeu, responda: "Estou pronto para responder as perguntas"`

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
    console.log("Erro ao inicializar IA:", err instanceof Error ? err.message : String(err))
  }
}

app.post("/api/ask", async (req, res) => {
  console.log("=== API /ask chamada ===", { body: req.body, headers: req.headers })
  const { question } = req.body
  if (!question) {
    console.log("Erro: Pergunta não informada")
    return res.status(400).json({ error: "Pergunta não informada" })
  }

  try {
    const prompt = `Você é um atendente especializado da loja diRavena.

INSTRUÇÕES IMPORTANTES:
1. Responda sempre em português, de forma cordial e útil
2. Use APENAS as informações dos produtos fornecidas abaixo
3. Quando perguntarem sobre preços, SEMPRE mencione o valor exato
4. Quando perguntarem por links ou quiserem "mais detalhes", SEMPRE forneça o URL completo do produto
5. Para comparações de preços, analise todos os produtos e dê a resposta correta
6. Seja proativo: se mencionarem um produto, já ofereça preço, parcelamento e link
7. Nunca diga que "não possui informações" se os dados estão disponíveis nos produtos

Produtos disponíveis:
${JSON.stringify(products, null, 2)}

Exemplos de respostas ideais:
- "O produto mais barato é o [nome] por R$ [preço]. Link: [url]"
- "Este produto custa R$ [preço], parcelado em [parcelas]. Veja mais detalhes: [url]"

Pergunta do cliente: "${question}"

Responda de forma completa e útil:`

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
    console.log("Groq API Response:", { status: resp.status, data })
    
    if (!resp.ok) {
      console.log("Groq API Error:", data)
      return res.status(resp.status).json(data)
    }

    const answer = data.choices?.[0]?.message?.content || "Resposta vazia da API"
    console.log("Answer:", answer)
    return res.json({ answer })
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) })
  }
})

// Servir arquivos estáticos do frontend em produção (DEPOIS das rotas da API)
app.use(express.static("front/dist"))

const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  initializeAI()
})
