import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface Equipment {
    _id: string;
    name: string;
    location: string;
    status: string;
    acquisitionDate: string;
}

interface DecodedToken {
    email: string;
    role: string;
}

const ListEquipment: React.FC = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipments = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setUserRole(decodedToken.role);

                const response = await api.get('/api/equipment', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEquipments(response.data);
            } catch (error) {
                setError('No tienes permiso para acceder a esta acción');
                console.error({ message: 'No se pudieron recuperar los equipos', error });
            }
        };
        fetchEquipments();
    }, []);

    const handleCreate = () => {
        navigate('/create');
    }

    const handleEdit = (_id: string) => {
        navigate(`/edit/${_id}`);
    }

    const handleDelete = async (_id: string) => {
        const confirmDelete = window.confirm('¿Estás seguro de eliminar este equipo?');
        if (!confirmDelete) return;

        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await api.delete(`/api/equipment/${_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEquipments(equipments.filter(equipment => equipment._id !== _id));
        } catch (error) {
            setError('No tienes permiso para realizar esta acción');
            console.error({ message: 'Failed to delete equipment', error });
        }
    }

    return (
        <Container>
            <h2 className="my-4">Lista de Equipos</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {userRole === 'admin' && (
                <Button variant='primary' onClick={handleCreate} className='mb-4'>
                    Crear Equipo
                </Button>
            )}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th>Fecha de Adquisición</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.length > 0 ? (
                        equipments.map(equipment => (
                            <tr key={equipment._id}>
                                <td>{equipment.name}</td>
                                <td>{equipment.location}</td>
                                <td>{equipment.status}</td>
                                <td>{equipment.acquisitionDate}</td>
                                <td>
                                    {userRole === 'admin' && (
                                        <>
                                            <Button variant='warning' onClick={() => handleEdit(equipment._id)}>
                                                <FaEdit />
                                            </Button>
                                            <Button variant='danger' onClick={() => handleDelete(equipment._id)}>
                                                <FaTrash />
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">No hay equipos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default ListEquipment;