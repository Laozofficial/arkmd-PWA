import api from "../interceptor";

export async function generateSessionId() {
  try {
    const response = await api.post("/chat/generate-chat-session-id");
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function handleChatPrompt(data: any) {
  try {
    const response = await api.post("/chat/handle-prompt", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function getChatHistoryById(id: any) {
  try {
    const response = await api.get(`/chat/get-chat-history-session-id/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function getChatSummary() {
  try {
    const response = await api.get(`/chat/get-all-chat-summaries`);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function createNewPatient(data: any) {
  try {
    const response = await api.post("/chat/create-patient", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function getPatients() {
  try {
    const response = await api.get(`/chat/get-patients`);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function getPatientChatById(id: any) {
  try {
    const response = await api.get(`/chat/get-chat-history/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function removePatientById(data: any) {
  try {
    const response = await api.post(`/chat/remove-patient`, data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function getChatLimit() {
  try {
    const response = await api.get(`/chat/get-free-messages-count`);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}
