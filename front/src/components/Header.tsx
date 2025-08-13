import { Navbar, Container } from "react-bootstrap"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 w-100" fluid>
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          diRavena
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header