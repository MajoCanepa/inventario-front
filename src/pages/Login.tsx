import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      // if (role === 'admin') {
        navigate('/equipment');
      // } else {
      //   setError('No tienes permisos para acceder a esta página');
      // }
    } catch (err) {
      console.error({ message: 'Error al iniciar sesión', err });
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh', transform: 'translateY(-10%)' }}>
      <Card className='shadow' style={{ width: '100%', maxWidth: '400px', padding: '2rem', borderRadius: '10px' }}>
        <h2 className='text-center mb-4'>Iniciar Sesión</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail" className='mb-3'>
            <Form.Control
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className='mb-3'>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {error && <p className='text-danger'>{error}</p>}
          <Button variant="primary" type="submit" className='w-100'>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;