import React from 'react';
import Navbar from '../components/navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';


import SchoolIcon from '@mui/icons-material/School';
import { CalendarMonth, Person, Event, Person2, HealthAndSafety } from '@mui/icons-material';

export default function Home() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path); 
    };

    return (
        <>
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 20,
                    transition: 'margin-left 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowX: 'hidden',
                }}
            >
                <Grid
                    container
                    spacing={6}
                    justifyContent="center"
                    alignItems="center"
                    paddingTop={10}
                >
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/students')}
                        >
                            <CardContent>
                                <SchoolIcon sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Alunos
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/teachers')}
                        >
                            <CardContent>
                                <Person2 sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Professores
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/events')}
                        >
                            <CardContent>
                                <Event sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Eventos
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={6}
                    justifyContent="center"
                    alignItems="center"
                    paddingTop={5}
                >
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/appointments')}
                        >
                            <CardContent>
                                <CalendarMonth sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Agendamentos em Saúde
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/profSaude')}
                        >
                            <CardContent>
                                <HealthAndSafety sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Profissionais em Saúde
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: '#f0f0f0',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                            onClick={() => handleNavigation('/users')}
                        >
                            <CardContent>
                                <Person sx={{ fontSize: 50, color: '#FFB703' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Usuários
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
