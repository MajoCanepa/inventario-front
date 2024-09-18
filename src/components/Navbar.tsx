
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";

const CustomNavbar: React.FC = () => {
  return (
    <BootstrapNavbar bg="light" expand="lg" fixed='top' className="w-100">
      <Container>
        <BootstrapNavbar.Brand href="/">Formotex</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/register" className="nav-link">
              Registro
            </Link>
            {/* <Link to="/equipment" className="nav-link">
              Equipos
            </Link> */}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;