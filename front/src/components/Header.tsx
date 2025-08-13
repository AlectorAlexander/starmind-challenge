import { Navbar, Container } from "react-bootstrap"

const Header = () => {
  return (
    <Navbar 
      variant="dark" 
      expand="lg" 
      className="py-3 w-100" 
      fixed="top"
      style={{
        background: "linear-gradient(90deg, #F8B50B 0%, #EE03A5 50%, #5857D3 100%)"
      }}
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          diRavena
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header