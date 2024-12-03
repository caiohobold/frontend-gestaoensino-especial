const endpoints = {
    // STUDENTS
    getAllAlunos: () => `/students`,
    getAlunoById: (alunoId) => `/students/${alunoId}`,
    addAluno: () => `/students`,
    updateAluno: (alunoId) => `/students/${alunoId}`,
    deleteAluno: (alunoId) => `/students/${alunoId}`,

    // AGENDAMENTOS
    getAllAgendamentos: () => `/appointments`,
    getAgendamentoById: (appointmentId) => `/appointments/${appointmentId}`,
    addAgendamento: () => `/appointments`,
    updateAgendamento: (appointmentId) => `/appointments/${appointmentId}`,
    deleteAgendamento: (appointmentId) => `/appointments/${appointmentId}`,

    // TEACHERS
    getAllTeachers: () => `/teachers`,
    getTeacherById: (teacherId) => `/teachers/${teacherId}`,
    addTeacher: () => `/teachers`,
    updateTeacher: (teacherId) => `/teachers/${teacherId}`,
    deleteTeacher: (teacherId) => `/teachers/${teacherId}`,

    // USUARIOS
    getAllUsuarios: () => `/users`,
    getUsuarioById: (usuarioId) => `/users/${usuarioId}`,
    addUsuario: () => `/users`,
    updateUsuario: (usuarioId) => `/users/${usuarioId}`,
    deleteUsuario: (usuarioId) => `/users/${usuarioId}`,

    // EVENTS
    getAllEvents: () => `/events`,
    getEventById: (eventId) => `/events/${eventId}`,
    addEvent: () => `/events`,
    updateEvent: (eventId) => `/events/${eventId}`,
    deleteEvent: (eventId) => `/events/${eventId}`,

    // PROF-SAUDE
    getAllProfSaudes: () => `/prof-saude`,
    getProfSaudeById: (profSaudeId) => `/prof-saude/${profSaudeId}`,
    addProfSaude: () => `/prof-saude`,
    updateProfSaude: (profSaudeId) => `/prof-saude/${profSaudeId}`,
    deleteProfSaude: (profSaudeId) => `/prof-saude/${profSaudeId}`,
  };
  
export default endpoints;