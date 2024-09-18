// listar en una tabla los equipos

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Container, Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

interface Equipment {
    _id: string;
    name: string;
    location: string;
    status: string;
    acquisitionDate: string;
}

const ListEquipment: React.FC = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipments = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await api.get('/api/equipment', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log(response.data)
                setEquipments(response.data);
            } catch (error) {
                console.error({ message: 'Failed to fetch equipments', error });
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
            console.error({ message: 'Failed to delete equipment', error });
        }
    }

    return (
        <Container>
            <h2 className="my-4">Lista de Equipos</h2>
            
            <Button variant='primary'  onClick={handleCreate} className='mb-4' >
                Crear Equipo
            </Button>
            
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
                    {equipments.map(equipment => (
                        <tr key={equipment._id}>
                            <td>{equipment.name}</td>
                            <td>{equipment.location}</td>
                            <td>{equipment.status}</td>
                            <td>{equipment.acquisitionDate}</td>
                            <td>
                                <Button variant='warning' onClick={() => handleEdit(equipment._id)}>
                                    <FaEdit />
                                </Button>
                                <Button variant='danger' onClick={() => handleDelete(equipment._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ListEquipment;
