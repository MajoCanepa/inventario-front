import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {  Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Equipment {
  id: string;
  name: string;
  location: string;
  status: string;
  acquisitionDate: string;
}

const CreataEquipment: React.FC = () => {
  const navigate = useNavigate();

  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    location: '',
    status: '',
    acquisitionDate: '',
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await api.get('/api/equipment', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setEquipments(response.data);
      } catch (error) {
        console.error({ message: 'Failed to fetch equipments', error });
        
      }
    };
    fetchEquipments();
  }, []);

  const handleAddEquipment = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const response = await api.post('/api/equipment', newEquipment, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const addedEquipment = response.data;
        setEquipments([...equipments, addedEquipment]);
        setNewEquipment({ name: '', location: '', status: '', acquisitionDate: '' });
        navigate('/equipment')
      } catch (error) {
        console.error({ message: 'Failed to add equipment', error });
      }
    };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className='shadow' style={{ width: '100%', maxWidth: '600px', padding: '20px', borderRadius: '10px' }}>
        <Card.Body>
          <h2 className="my-4 text-center">Crear Equipo</h2>
          <Form>
            <Form.Group controlId="formEquipmentName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                placeholder="Ingrese el nombre del equipo"
              />
            </Form.Group>
            <Form.Group controlId="formEquipmentLocation" className="mt-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                value={newEquipment.location}
                onChange={(e) => setNewEquipment({ ...newEquipment, location: e.target.value })}
                placeholder="Ingrese la ubicación del equipo"
              />
            </Form.Group>
            <Form.Group controlId="formEquipmentStatus" className="mt-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                value={newEquipment.status}
                onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value })}
                placeholder="Ingrese el estado del equipo"
              />
            </Form.Group>
            <Form.Group controlId="formEquipmentDate" className="mt-3">
              <Form.Label>Fecha de Adquisición</Form.Label>
              <Form.Control
                type="date"
                value={newEquipment.acquisitionDate}
                onChange={(e) => setNewEquipment({ ...newEquipment, acquisitionDate: e.target.value })}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handleAddEquipment} className="mt-3">
              Cargar Equipo
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreataEquipment;
