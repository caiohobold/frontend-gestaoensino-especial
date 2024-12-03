import api from "@/api/apiBase";
import endpoints from "@/api/endPoints";

export const getAllEvents = async () => {
    try {
      const response = await api.get(endpoints.getAllEvents());
      return response.data;
    } catch (error) {
      return error;
    }
};

export const getEventById = async (eventId) => {
    try {
      const response = await api.get(endpoints.getEventById(eventId));
      return response.data;
    } catch (error) {
      return error;
    }
}

export const createEvent = async (data) => {
  try {
    const response = await api.post(endpoints.addEvent(), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateEvent = async (eventId, data) => {
  try {
    const response = await api.put(endpoints.updateEvent(eventId), data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(endpoints.deleteEvent(eventId));
    return response.data;
  } catch (error) {
    return error;
  }
}