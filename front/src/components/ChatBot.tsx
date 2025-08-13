import { useState } from "react"
import { Button, Card, Form, InputGroup } from "react-bootstrap"
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa"
import axios from "axios"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage = { text: inputText, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:3001/api/ask", {
        question: inputText
      })
      
      const botMessage = { text: response.data.answer, isUser: false }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = { text: "Desculpe, ocorreu um erro. Tente novamente.", isUser: false }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <div 
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000
        }}
      >
        <Button
          variant="success"
          size="lg"
          className="rounded-circle p-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaWhatsapp />}
        </Button>
      </div>

      {/* Chat box */}
      {isOpen && (
        <Card
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "400px",
            zIndex: 1000
          }}
        >
          <Card.Header className="bg-success text-white">
            <strong>Atendimento diRavena</strong>
          </Card.Header>
          
          <Card.Body 
            className="d-flex flex-column p-2"
            style={{ height: "300px", overflowY: "auto" }}
          >
            {messages.length === 0 && (
              <div className="text-muted small text-center mt-3">
                Olá! Como posso ajudar você hoje?
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.isUser ? "text-end" : "text-start"}`}
              >
                <div
                  className={`d-inline-block p-2 rounded small ${
                    message.isUser 
                      ? "bg-primary text-white" 
                      : "bg-light text-dark"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="text-start">
                <div className="d-inline-block p-2 rounded small bg-light">
                  Digitando...
                </div>
              </div>
            )}
          </Card.Body>

          <Card.Footer className="p-2">
            <InputGroup size="sm">
              <Form.Control
                type="text"
                placeholder="Digite sua pergunta..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={isLoading}
              />
              <Button 
                variant="success" 
                onClick={sendMessage}
                disabled={isLoading || !inputText.trim()}
              >
                <FaPaperPlane />
              </Button>
            </InputGroup>
          </Card.Footer>
        </Card>
      )}
    </>
  )
}

export default ChatBot