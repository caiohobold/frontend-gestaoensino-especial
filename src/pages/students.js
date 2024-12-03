import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { getAllAlunos, createAluno, deleteAluno, updateAluno } from '@/api/services/students';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Alunos() {

    const [alunos, setAlunos] = useState([]);

    const [payloadData, setPayloadData] = useState({
        name: '',
        age: '',
        phone_number: '',
        special_needs: ''
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [alunoIdParaDeletar, setAlunoIdParaDeletar] = useState(null);

    const recuperarAlunos = async () => {
        try {
            const response = await getAllAlunos();
            setAlunos(response);
        } catch (error) {
            setError(error);
        }
    };

    const handleSubmit = async () => {
        if (!payloadData.name || !payloadData.age || !payloadData.phone_number || !payloadData.special_needs) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        try {
            if (isAdding) {
                await createAluno(payloadData);
            } else if (isEditing) {
                await updateAluno(editingId, payloadData);
            }
            setIsDialogOpen(false);
            recuperarAlunos();
            setPayloadData({
                name: '',
                age: '',
                phone_number: '',
                special_needs: ''
            });
        } catch (error) {
            alert('Erro ao salvar aluno');
        }
    };

    const handleButtonCadastrar = () => {
        setPayloadData({
            name: '',
            age: '',
            phone_number: '',
            special_needs: ''
        });
        setIsDialogOpen(true);
        setIsAdding(true);
    };

    const handleEdit = (aluno) => {
        setIsAdding(false); 
        setPayloadData({
            name: aluno.name,
            age: aluno.age,
            phone_number: aluno.phone_number,
            special_needs: aluno.special_needs
        });
        setEditingId(aluno._id);
        setIsDialogOpen(true);
        setIsEditing(true);
    };

    const handleDelete = (alunoId) => {
        setAlunoIdParaDeletar(alunoId);
        setIsDialogDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteAluno(alunoIdParaDeletar);
            alert('Aluno removido com sucesso!');
            setIsDialogDeleteOpen(false);
            recuperarAlunos();
        } catch (error) {
            alert('Erro ao remover aluno');
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

    useEffect(() => {
        recuperarAlunos();
    }, []);

    return (
        <>
            <div style={{ padding: 50, marginTop: 150 }}>
                <h2 style={{ fontSize: 25, marginLeft: 10 }}>Alunos</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonCadastrar}
                    style={{ marginBottom: 20 }}
                >
                    Adicionar Aluno
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Idade</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Necessidades Especiais</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {alunos.map((aluno) => (
                                <TableRow key={aluno._id}>
                                    <TableCell>{aluno.name}</TableCell>
                                    <TableCell>{aluno.age}</TableCell>
                                    <TableCell>{aluno.phone_number}</TableCell>
                                    <TableCell>{aluno.special_needs}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(aluno)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(aluno._id)} color="secondary">
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
                <DialogTitle>{isAdding ? "Adicionar Novo Aluno" : "Editar Aluno"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        fullWidth
                        value={payloadData.name}
                        onChange={(e) => setPayloadData({ ...payloadData, name: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Idade"
                        type='number'
                        fullWidth
                        value={payloadData.age}
                        onChange={(e) => setPayloadData({ ...payloadData, age: e.target.value })}
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
                        label="Necessidades Especiais"
                        fullWidth
                        value={payloadData.special_needs}
                        onChange={(e) => setPayloadData({ ...payloadData, special_needs: e.target.value })}
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
                    <p>Tem certeza que deseja remover este aluno?</p>
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
