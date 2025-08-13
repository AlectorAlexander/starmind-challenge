import { useState, useCallback } from "react"
import { Button, Card, Form, InputGroup } from "react-bootstrap"
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa"
import axios from "axios"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async () => {
    if (!inputText.trim()) return

    const userMessage = { text: inputText, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      const response = await axios.post("/api/ask", {
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
  }, [inputText])

  return (
    <>
      {/* Botão flutuante */}
      <div 
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999
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
          className="d-none d-sm-block"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "min(350px, calc(100vw - 40px))",
            height: "min(400px, calc(100vh - 120px))",
            zIndex: 9999
          }}
        >
          <Card.Header className="bg-success text-white">
            <strong>Atendimento diRavena</strong>
          </Card.Header>
          
          <Card.Body 
            className="d-flex flex-column p-2"
            style={{ 
              height: "calc(100% - 120px)", 
              overflowY: "auto",
              fontSize: "0.875rem"
            }}
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

      {/* Chat mobile - tela cheia */}
      {isOpen && (
        <div 
          className="d-block d-sm-none position-fixed top-0 start-0 w-100 h-100 bg-white"
          style={{ zIndex: 9999 }}
        >
          <div className="d-flex flex-column h-100">
            <div className="bg-success text-white p-3 d-flex justify-content-between align-items-center">
              <strong>Atendimento diRavena</strong>
              <Button 
                variant="link" 
                className="text-white p-0"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes size={20} />
              </Button>
            </div>
            
            <div 
              className="flex-grow-1 p-3 overflow-auto"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              {messages.length === 0 && (
                <div className="text-muted text-center mt-5">
                  Olá! Como posso ajudar você hoje?
                </div>
              )}
              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 ${message.isUser ? "text-end" : "text-start"}`}
                >
                  <div
                    className={`d-inline-block p-3 rounded ${message.isUser 
                      ? "bg-primary text-white" 
                      : "bg-white text-dark shadow-sm"
                    }`}
                    style={{ maxWidth: "85%" }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="text-start">
                  <div className="d-inline-block p-3 rounded bg-white shadow-sm">
                    Digitando...
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-white border-top">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Digite sua pergunta..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  disabled={isLoading}
                  className="border-0 shadow-none"
                  style={{ backgroundColor: "#f8f9fa" }}
                />
                <Button 
                  variant="success" 
                  onClick={sendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="px-4"
                >
                  <FaPaperPlane />
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot