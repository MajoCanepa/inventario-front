import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {  Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';



interface Equipment {
  _id: string;
  name: string;
  location: string;
  status: string;
  acquisitionDate: string;
}

const EditEquipment: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const [equipment, setEquipment] = useState<Equipment | null>(null)
    const [formData, setFormData] = useState<Equipment>({
        _id: '',
        name: '',
        location: '',
        status: '',
        acquisitionDate: ''
    })


    useEffect(() => {
        const fetchEquipment = async () => {
            const token = localStorage.getItem('token');
            // console.log('token', token)
            if (!token) return;

            try {
                const response = await api.get(`/api/equipment/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data)
                setEquipment(response.data)
                setFormData({
                    _id: response.data._id,
                    name: response.data.name,
                    location: response.data.location,
                    status: response.data.status,
                    acquisitionDate: response.data.acquisitionDate
                })
            } catch (error) {
                console.error({ message: 'Error', error });
            }
        };
        fetchEquipment();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await api.put(`/api/equipment/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            navigate('/equipment');
        } catch (error) {
            console.error({ message: 'Failed to edit equipment', error });
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className='shadow' style={{ width: '100%', maxWidth: '600px', padding: '20px', borderRadius: '10px' }}>
                <Card.Body>
                    <h2 className="my-4 text-center">Editar Equipo</h2>
                    {equipment ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEquipmentName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ingrese el nombre del equipo"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEquipmentLocation" className="mt-3">
                                <Form.Label>Ubicación</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Ingrese la ubicación del equipo"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEquipmentStatus" className="mt-3">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    placeholder="Ingrese el estado del equipo"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEquipmentDate" className="mt-3">
                                <Form.Label>Fecha de Adquisición</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="acquisitionDate"
                                    value={formData.acquisitionDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit" className="mt-3">
                                Actualizar Equipo
                            </Button>
                        </Form>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EditEquipment;