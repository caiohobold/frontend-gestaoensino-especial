import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { createProfSaude, deleteProfSaude, getAllProfSaudes, updateProfSaude } from '@/api/services/profissionais';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProfSaude() {

    const [profSaude, setProfSaude] = useState([]);

    const [payloadData, setPayloadData] = useState({
        name: '',
        specialty: '',
        contact: '',
        phone_number: '',
        status: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [profissionalIdParaDeletar, setProfissionaisIdParaDeletar] = useState(null);

    const recuperarProfissionais = async () => {
        try {
            const response = await getAllProfSaudes();
            console.log('Resposta da API:', response);
            setProfSaude(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        if (!payloadData.name || !payloadData.specialty || !payloadData.contact || !payloadData.phone_number) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        try {
            if (isAdding) {
                await createProfSaude( {...payloadData, status: 'on' });
                alert('Profissional criado com sucesso!');
            } else if (isEditing) {
                await updateProfSaude(editingId, payloadData);
                alert('Profissional atualizado com sucesso!');
            }
            setIsDialogOpen(false);
            recuperarProfissionais();
            setPayloadData({
                name: '',
                specialty: '',
                contact: '',
                phone_number: '',
                status: '',
            });
        } catch (error) {
            console.log(error);
            alert('Erro ao salvar profissional');
        }
    };

    const handleButtonCadastrar = () => {
        setPayloadData({
            name: '',
            specialty: '',
            contact: '',
            phone_number: '',
            status: '',
        });
        setIsDialogOpen(true);
        setIsAdding(true);
    };

    const getStatusProfissional = (status) => {
        if (status === 'on') {
            return 'Ativo';
        }

        return 'Inativo';
    }

    const handleEdit = (profissional) => {
        setIsAdding(false); 
        setPayloadData({
            name: profissional.name,
            specialty: profissional.specialty,
            contact: profissional.contact,
            phone_number: profissional.phone_number,
            status: profissional.status,
        });
        setEditingId(profissional._id);
        setIsDialogOpen(true);
        setIsEditing(true);
    };

    const handleDelete = (profissionalId) => {
        setProfissionaisIdParaDeletar(profissionalId);
        setIsDialogDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteProfSaude(profissionalIdParaDeletar);
            alert('Profissional removido com sucesso!');
            setIsDialogDeleteOpen(false);
            recuperarProfissionais();
        } catch (error) {
            alert('Erro ao remover profissional');
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
        recuperarProfissionais();
    }, []);

    return (
        <>
            <div style={{ padding: 50, marginTop: 150 }}>
                <h2 style={{ fontSize: 25, marginLeft: 10 }}>Profissionais em Saúde</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonCadastrar}
                    style={{ marginBottom: 20 }}
                >
                    Adicionar Profissional
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Especialidade</TableCell>
                                <TableCell>Contato</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profSaude.map((profissional) => (
                                <TableRow key={profissional._id}>
                                    <TableCell>{profissional.name}</TableCell>
                                    <TableCell>{profissional.specialty}</TableCell>
                                    <TableCell>{profissional.contact}</TableCell>
                                    <TableCell>{profissional.phone_number}</TableCell>
                                    <TableCell>{getStatusProfissional(profissional.status)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(profissional)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(profissional._id)} color="secondary">
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
                <DialogTitle>{isAdding ? "Adicionar Novo Profissional" : "Editar Profissional"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        fullWidth
                        value={payloadData.name}
                        onChange={(e) => setPayloadData({ ...payloadData, name: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Especialidade"
                        fullWidth
                        value={payloadData.specialty}
                        onChange={(e) => setPayloadData({ ...payloadData, specialty: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Contato"
                        fullWidth
                        value={payloadData.contact}
                        onChange={(e) => setPayloadData({ ...payloadData, contact: e.target.value })}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDialogDeleteOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <p>Tem certeza que deseja remover este profissional?</p>
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
