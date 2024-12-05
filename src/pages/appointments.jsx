import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { format, parseISO, addDays } from 'date-fns';
import { createAgendamento, deleteAgendamento, getAllAgendamentos, updateAgendamento } from '@/api/services/appointments';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AgendamentosSaude() {

    const [agendamentos, setAgendamentos] = useState([]);

    const [payloadData, setPayloadData] = useState({
        specialty: '',
        comments: '',
        date: '',
        student: '',
        professional: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [agendamentoIdParaDeletar, setagendamentoIdParaDeletar] = useState(null);

    const recuperarAgendamentos = async () => {
        try {
            const response = await getAllAgendamentos();
            setAgendamentos(response);
        } catch (error) {
            setError(error);
        }
    };

    const handleSubmit = async () => {
        if (!payloadData.comments || !payloadData.date || !payloadData.professional || !payloadData.specialty || !payloadData.student) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        try {
            if (isAdding) {
                await createAgendamento(payloadData);
            } else if (isEditing) {
                await updateAgendamento(editingId, payloadData);
            }
            setIsDialogOpen(false);
            recuperarAgendamentos();
            setPayloadData({
                specialty: '',
                comments: '',
                date: '',
                student: '',
                professional: '',
            });
        } catch (error) {
            console.error('Erro ao criar agendamento! ', error)
        }
    };

    const handleButtonCadastrar = () => {
        setPayloadData({
            specialty: '',
            comments: '',
            date: '',
            student: '',
            professional: '',        
        });
        setIsDialogOpen(true);
        setIsAdding(true);
    };

    const handleEdit = (agendamento) => {
        setIsAdding(false);
        setPayloadData({
            specialty: agendamento.specialty,
            comments: agendamento.comments,
            date: agendamento.date ? format(addDays(new Date(agendamento.date), 1), 'yyyy-MM-dd') : '',
            student: agendamento.student,
            professional: agendamento.professional,
        });
        setEditingId(agendamento._id);
        setIsDialogOpen(true);
        setIsEditing(true);
    };

    const handleDelete = (agendamentoId) => {
        setagendamentoIdParaDeletar(agendamentoId);
        setIsDialogDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteAgendamento(agendamentoIdParaDeletar);
            setIsDialogDeleteOpen(false);
            recuperarAgendamentos();
        } catch (error) {
            console.log('Erro ao remover agendamento!');
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
        recuperarAgendamentos();
    }, []);

    return (
        <>
            <div style={{ padding: 50, marginTop: 150 }}>
                <h2 style={{ fontSize: 25, marginLeft: 10 }}>Agendamentos</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonCadastrar}
                    style={{ marginBottom: 20 }}
                >
                    Adicionar Agendamento
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Especialidade</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Aluno</TableCell>
                                <TableCell>Profissional</TableCell>
                                <TableCell>Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agendamentos.map((agendamento) => (
                                <TableRow key={agendamento._id}>
                                    <TableCell>{agendamento.specialty}</TableCell>
                                    <TableCell>{agendamento.comments}</TableCell>
                                    <TableCell>{agendamento.student}</TableCell>
                                    <TableCell>{agendamento.professional}</TableCell>
                                    <TableCell>{format(addDays(new Date(agendamento.date), 1), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(agendamento)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(agendamento._id)} color="secondary">
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
                <DialogTitle>{isAdding ? "Adicionar Novo agendamento" : "Editar agendamento"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Especialidade"
                        fullWidth
                        value={payloadData.specialty}
                        onChange={(e) => setPayloadData({ ...payloadData, specialty: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Descrição"
                        fullWidth
                        value={payloadData.comments}
                        onChange={(e) => setPayloadData({ ...payloadData, comments: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Aluno"
                        fullWidth
                        value={payloadData.student}
                        onChange={(e) => setPayloadData({ ...payloadData, student: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Profissional"
                        fullWidth
                        value={payloadData.professional}
                        onChange={(e) => setPayloadData({ ...payloadData, professional: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        type="date"
                        fullWidth
                        value={
                            payloadData.date
                                ? format(addDays(new Date(payloadData.date), 1), 'yyyy-MM-dd')
                                : ''
                        }
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
                    <p>Tem certeza que deseja remover este agendamento?</p>
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
