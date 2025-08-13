import { Container } from "react-bootstrap"
import ProductList from "./ProductList"

const Main = () => {
  return (
    <main className="py-3 py-md-5 flex-grow-1">
      <Container>
        <h1 className="text-center mb-4 mb-md-5 fs-2 fs-md-1">Nossos Produtos</h1>
        <ProductList />
      </Container>
    </main>
  )
}

export default Main