import { Container } from "react-bootstrap"
import ProductList from "./ProductList"

const Main = () => {
  return (
    <main className="py-4">
      <Container>
        <h1 className="text-center mb-4">Nossos Produtos</h1>
        <ProductList />
      </Container>
    </main>
  )
}

export default Main