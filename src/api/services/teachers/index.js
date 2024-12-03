import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllTeachers = async () => {
    try {
      const response = await api.get(endpoints.getAllTeachers());
      return response.data;
    } catch (error) {
      return error;
    }
};

export const getTeacherById = async (funcionarioId) => {
    try {
      const response = await api.get(endpoints.getTeacherById(funcionarioId));
      return response.data;
    } catch (error) {
      return error;
    }
}

export const createTeacher = async (data) => {
  try {
    const response = await api.post(endpoints.addTeacher(), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateTeacher = async (funcionarioId, data) => {
  try {
    const response = await api.put(endpoints.updateTeacher(funcionarioId), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteTeacher = async (funcionarioId) => {
  try {
    const response = await api.delete(endpoints.deleteTeacher(funcionarioId));
    return response.data;
  } catch (error) {
    return error;
  }
}