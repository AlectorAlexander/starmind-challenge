import { useState, useEffect } from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import axios from "axios"

interface Product {
  title: string
  promo_price: number
  installments: string
  url: string
  image: string
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/itens.json")
        const data = response.data
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error("Dados não são um array:", data)
        }
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <Row className="g-3">
      {products.map((product, index) => (
        <Col xs={12} sm={6} md={4} lg={3} xl={3} key={`${product.url}-${index}`}>
          <a 
            href={product.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card className="h-100 shadow-sm position-relative" style={{ border: "none", cursor: "pointer" }}>
              <Button 
                className="position-absolute text-center"
                style={{
                  top: "10px",
                  left: "10px",
                  backgroundColor: "white",
                  color: "red",
                  border: "2px solid red",
                  borderRadius: "15px",
                  fontSize: "0.75rem",
                  padding: "5px 10px",
                  zIndex: 10,
                  lineHeight: "1.2",
                  textDecoration: "none",
                  pointerEvents: "none"
                }}
              >
                Ver<br />Produto
              </Button>
              <Card.Img 
                variant="top" 
                src={product.image} 
                style={{ 
                  height: "180px", 
                  objectFit: "cover",
                  borderRadius: "0.375rem 0.375rem 0 0"
                }} 
              />
              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fs-6 fw-bold text-truncate" title={product.title}>
                  {product.title}
                </Card.Title>
                <div className="mt-auto">
                  <h5 className="text-success mb-1 fs-5">R$ {product.promo_price.toFixed(2)}</h5>
                  <p className="text-muted small mb-2">{product.installments}</p>
                </div>
              </Card.Body>
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  )
}

export default ProductList