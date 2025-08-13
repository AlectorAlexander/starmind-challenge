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
    <Row>
      {products.map((product, index) => (
        <Col md={6} lg={4} key={index} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src={product.image} style={{ height: "200px", objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="small">{product.title}</Card.Title>
              <div className="mt-auto">
                <h5 className="text-success">R$ {product.promo_price.toFixed(2)}</h5>
                <p className="text-muted small">{product.installments}</p>
                <Button variant="primary" href={product.url} target="_blank" size="sm">
                  Ver Produto
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default ProductList