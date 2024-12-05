import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsuarios, createUsuario, deleteUsuario, updateUsuario } from '@/api/services/usuarios';

export default function ProfSaude() {

    const [usuario, setUsuarios] = useState([]);

    const [payloadData, setPayloadData] = useState({
        nome: '',
        email: '',
        user: '',
        pwd: '',
        level: '',
        status: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [usuarioIdParaDeletar, setUsuariosIdParaDeletar] = useState(null);

    const recuperarUsuarios = async () => {
        try {
            const response = await getAllUsuarios();
            console.log('Resposta da API:', response);
            setUsuarios(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        if (!payloadData.nome || !payloadData.email || !payloadData.user || !payloadData.level || !payloadData.pwd || !payloadData.level) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        try {
            if (isAdding) {
                await createUsuario( {...payloadData, status: 'on' });
                alert('Usuario criado com sucesso!');
            } else if (isEditing) {
                await updateUsuario(editingId, payloadData);
                alert('Usuario atualizado com sucesso!');
            }
            setIsDialogOpen(false);
            recuperarUsuarios();
            setPayloadData({
                nome: '',
                email: '',
                user: '',
                pwd: '',
                level: '',
                status: '',
            });
        } catch (error) {
            console.log(error);
            alert('Erro ao salvar usuario');
        }
    };

    const handleButtonCadastrar = () => {
        setPayloadData({
            nome: '',
            email: '',
            user: '',
            pwd: '',
            level: '',
            status: '',
        });
        setIsDialogOpen(true);
        setIsAdding(true);
    };

    const getStatusUsuario = (status) => {
        if (status === 'on') {
            return 'Ativo';
        }

        return 'Inativo';
    }

    const handleEdit = (usuario) => {
        setIsAdding(false); 
        setPayloadData({
            nome: usuario.nome,
            email: usuario.email,
            user: usuario.user,
            pwd: usuario.pwd,
            level: usuario.level,
            status: usuario.status,
        });
        setEditingId(usuario._id);
        setIsDialogOpen(true);
        setIsEditing(true);
    };

    const handleDelete = (usuarioId) => {
        setUsuariosIdParaDeletar(usuarioId);
        setIsDialogDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteUsuario(usuarioIdParaDeletar);
            alert('Usuario removido com sucesso!');
            setIsDialogDeleteOpen(false);
            recuperarUsuarios();
        } catch (error) {
            alert('Erro ao remover usuario');
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

    const getPerfilAcesso = (perfilAcesso) => {
        switch (perfilAcesso) {
            case 'admin':
                return 'Administrador';
            case 'teacher':
                return 'Professor';
            case 'profSaude':
                return 'Profissional de Saúde';
        }
    }

    useEffect(() => {
        recuperarUsuarios();
    }, []);

    return (
        <>
            <div style={{ padding: 50, marginTop: 150 }}>
                <h2 style={{ fontSize: 25, marginLeft: 10 }}>Usuários</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonCadastrar}
                    style={{ marginBottom: 20 }}
                >
                    Adicionar Usuário
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Usuário</TableCell>
                                <TableCell>Perfil de Acesso</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuario.map((usuario) => (
                                <TableRow key={usuario._id}>
                                    <TableCell>{usuario.nome}</TableCell>
                                    <TableCell>{usuario.email}</TableCell>
                                    <TableCell>{usuario.user}</TableCell>
                                    <TableCell>{getPerfilAcesso(usuario.level)}</TableCell>
                                    <TableCell>{getStatusUsuario(usuario.status)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(usuario)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(usuario._id)} color="secondary">
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
                <DialogTitle>{isAdding ? "Adicionar Novo Usuario" : "Editar Usuario"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        fullWidth
                        value={payloadData.nome}
                        onChange={(e) => setPayloadData({ ...payloadData, nome: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="E-mail"
                        fullWidth
                        value={payloadData.email}
                        onChange={(e) => setPayloadData({ ...payloadData, email: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        label="Nome de usuário"
                        fullWidth
                        value={payloadData.user}
                        onChange={(e) => setPayloadData({ ...payloadData, user: e.target.value })}
                        style={{ marginBottom: 10 }}
                    />
                    <FormControl fullWidth style={{ marginBottom: 10 }}>
                        <InputLabel id="perfil-acesso-label">Perfil de Acesso</InputLabel>
                        <Select
                            labelId="perfil-acesso-label"
                            value={payloadData.level}
                            onChange={(e) => setPayloadData({ ...payloadData, level: e.target.value })}
                        >
                            <MenuItem value="admin">Administrador</MenuItem>
                            <MenuItem value="teacher">Professor</MenuItem>
                            <MenuItem value="profSaude">Profissional de Saúde</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Senha"
                        fullWidth
                        value={payloadData.pwd}
                        onChange={(e) => setPayloadData({ ...payloadData, pwd: e.target.value })}
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
                    <p>Tem certeza que deseja remover este usuario?</p>
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
