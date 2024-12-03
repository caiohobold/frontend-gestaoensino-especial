import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllProfSaudes = async () => {
    try {
      const response = await api.get(endpoints.getAllProfSaudes());
      return response.data;
    } catch (error) {
      return error;
    }
};

export const getProfSaudeById = async (profSaudeId) => {
    try {
      const response = await api.get(endpoints.getProfSaudeById(profSaudeId));
      return response.data;
    } catch (error) {
      return error;
    }
}

export const createProfSaude = async (data) => {
  try {
    const dataFormatada = {
      ...data,
      hora_inicio: `${data.data}T${data.hora_inicio}:00`,
      hora_fim: `${data.data}T${data.hora_fim}:00`
    }

    const response = await api.post(endpoints.addProfSaude(), dataFormatada);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateProfSaude = async (profSaudeId, data) => {
  try {
    const response = await api.put(endpoints.updateProfSaude(profSaudeId), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteProfSaude = async (profSaudeId) => {
  try {
    const response = await api.delete(endpoints.deleteProfSaude(profSaudeId));
    return response.data;
  } catch (error) {
    return error;
  }
}