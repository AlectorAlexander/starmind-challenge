import { Container } from "react-bootstrap"
import ProductList from "./ProductList"

const Main = () => {
  return (
    <main className="py-3 py-md-5 flex-grow-1 mt-5" style={{ paddingTop: "100px" }}>
      <Container>
        <div className="text-center mb-4 mb-md-5">
          <img 
            src="https://diravena.com/cdn/shop/files/diravena_Grande_cd2045c2-4b6f-4354-89da-42c21bd4f9a4_260x.png?v=1705259678"
            alt="diRavena Logo"
            className="img-fluid mb-3"
            style={{ maxHeight: "120px" }}
          />
        </div>
        <ProductList />
      </Container>
    </main>
  )
}

export default Main