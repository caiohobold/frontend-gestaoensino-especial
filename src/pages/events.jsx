import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { format, parseISO } from 'date-fns';
import { getAllEvents, createEvent, deleteEvent, updateEvent } from '@/api/services/events';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Eventos() {

    const [eventos, setEventos] = useState([]);

    const [payloadData, setPayloadData] = useState({
        description: '',
        comment: '',
        date: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [eventoIdParaDeletar, seteventoIdParaDeletar] = useState(null);

    const recuperarEventos = async () => {
        try {
            const response = await getAllEvents();
            setEventos(response);
        } catch (error) {
            setError(error);
        }
    };

    const handleSubmit = async () => {
        if (!payloadData.description || !payloadData.comment || !payloadData.date) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        try {
            if (isAdding) {
                await createEvent( { ...payloadData, status: 'ativo' } );
            } else if (isEditing) {
                await updateEvent(editingId, payloadData);
            }
            setIsDialogOpen(false);
            recuperarEventos();
            setPayloadData({
                description: '',
                comment: '',
                date: '',
            });
        } catch (error) {
            console.error('Erro ao criar evento! ', error)
        }
    };

    const handleButtonCadastrar = () => {
        setPayloadData({
            description: '',
            comment: '',
            date: '',           
        });
        setIsDialogOpen(true);
        setIsAdding(true);
    };

    const handleEdit = (evento) => {
        setIsAdding(false); 
        setPayloadData({
            description: evento.description,
            comment: evento.comment,
            date: format(parseISO(evento.date), 'yyyy-MM-dd'), 
            email: evento.email,
            status: evento.status
        });
        setEditingId(evento._id);
        setIsDialogOpen(true);
        setIsEditing(true);
    };

    const handleDelete = (eventoId) => {
        seteventoIdParaDeletar(eventoId);
        setIsDialogDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteEvent(eventoIdParaDeletar);
            setIsDialogDeleteOpen(false);
            recuperarEventos();
        } catch (error) {
            console.log('Erro ao remover evento!');
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsAdding(false);
        setIsEditing(false);
    };

    const handleCloseDeleteDialog = () => {
        setIsDialogDeleteOpen(false);
    };

    useEffect(() => {
        recuperarEventos();
    }, []);

    return (
        <>
            <div style={{ padding: 50, marginTop: 150 }}>
                <h2 style={{ fontSize: 25, marginLeft: 10 }}>Eventos</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonCadastrar}
                    style={{ marginBottom: 20 }}
                >
                    Adicionar Evento
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Comentário</TableCell>
                                <TableCell>Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventos.map((evento) => (
                                <TableRow key={evento._id}>
                                    <TableCell>{evento.description}</TableCell>
                                    <TableCell>{evento.comment}</TableCell>
                                    <TableCell>{format(new Date(evento.date), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(evento)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(evento._id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{isAdding ? "Adicionar Novo evento" : "Editar evento"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Descrição"
                        fullWidth
                        value={payloadData.description}
                        onChange={(e) => setPayloadData({ ...payloadData, description: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Comentários"
                        fullWidth
                        value={payloadData.comment}
                        onChange={(e) => setPayloadData({ ...payloadData, comment: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        type='date'
                        fullWidth
                        value={payloadData.date}
                        onChange={(e) => setPayloadData({ ...payloadData, date: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDialogDeleteOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <p>Tem certeza que deseja remover este evento?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="secondary">Cancelar</Button>
                    <Button onClick={handleDeleteConfirm} color="primary">Confirmar</Button>
                </DialogActions>
            </Dialog>

            <Navbar />
        </>
    );
}
