import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { getAllTeachers, createTeacher, deleteTeacher, updateTeacher } from '@/api/services/teachers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Professores() {

    const [professores, setProfessores] = useState([]);

    const [payloadData, setPayloadData] = useState({
        name: '',
        subject: '',
        phone_number: '',
        email: '',
        status: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [professorIdParaDeletar, setprofessorIdParaDeletar] = useState(null);

    const recuperarProfessores = async () => {
        try {
            const response = await getAllTeachers();
            setProfessores(response);
        } catch (error) {
            setError(error);
        }
    };

    const handleSubmit = async () => {
        if (!payloadData.name || !payloadData.subject || !payloadData.phone_number || !payloadData.email) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        try {
            if (isAdding) {
                await createTeacher( { ...payloadData, status: 'ativo' } );
            } else if (isEditing) {
                await updateTeacher(editingId, payloadData);
            }
            setIsDialogOpen(false);
            recuperarProfessores();
            setPayloadData({
                name: '',
                subject: '',
                phone_number: '',
                email: '',
                status: '',
            });
        } catch (error) {
            console.error('Erro ao criar professor! ', error)
        }
    };

    const handleButtonCadastrar = () => {
        setPayloadData({
            name: '',
            subject: '',
            phone_number: '',
            email: '',
            status: '',
        });
        setIsDialogOpen(true);
        setIsAdding(true);
    };

    const handleEdit = (professor) => {
        setIsAdding(false); 
        setPayloadData({
            name: professor.name,
            subject: professor.subject,
            phone_number: professor.phone_number,
            email: professor.email,
            status: professor.status
        });
        setEditingId(professor._id);
        setIsDialogOpen(true);
        setIsEditing(true);
    };

    const handleDelete = (professorId) => {
        setprofessorIdParaDeletar(professorId);
        setIsDialogDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteTeacher(professorIdParaDeletar);
            setIsDialogDeleteOpen(false);
            recuperarProfessores();
        } catch (error) {
            console.log('Erro ao remover professor!');
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

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/\D/g, '');
        if (phoneNumber.length <= 10) {
            return phoneNumber.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        }
        return phoneNumber.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    };

    const getStatus = (status) => {
        if (status === 'ativo') {
            return 'Ativo';
        }

        return 'Inativo';
    }

    useEffect(() => {
        recuperarProfessores();
    }, []);

    return (
        <>
            <div style={{ padding: 50, marginTop: 150 }}>
                <h2 style={{ fontSize: 25, marginLeft: 10 }}>Professores</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonCadastrar}
                    style={{ marginBottom: 20 }}
                >
                    Adicionar professor
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Matéria</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {professores.map((professor) => (
                                <TableRow key={professor._id}>
                                    <TableCell>{professor.name}</TableCell>
                                    <TableCell>{professor.subject}</TableCell>
                                    <TableCell>{professor.phone_number}</TableCell>
                                    <TableCell>{professor.email}</TableCell>
                                    <TableCell>{getStatus(professor.status)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(professor)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(professor._id)} color="secondary">
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
                <DialogTitle>{isAdding ? "Adicionar Novo professor" : "Editar professor"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        fullWidth
                        value={payloadData.name}
                        onChange={(e) => setPayloadData({ ...payloadData, name: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Matéria"
                        fullWidth
                        value={payloadData.subject}
                        onChange={(e) => setPayloadData({ ...payloadData, subject: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Telefone"
                        fullWidth
                        value={payloadData.phone_number}
                        onChange={(e) => setPayloadData({ ...payloadData, phone_number: formatPhoneNumber(e.target.value) })}
                        style={{ marginBottom: 10 }}
                        inputProps={{ maxLength: 15 }}
                    />
                    <TextField
                        type='email'
                        label="E-mail"
                        fullWidth
                        value={payloadData.email}
                        onChange={(e) => setPayloadData({ ...payloadData, email: e.target.value })}
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
                    <p>Tem certeza que deseja remover este professor?</p>
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
