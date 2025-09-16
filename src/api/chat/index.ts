import api from "../interceptor";

export async function generateSessionId() {
  try {
    const response = await api.post("/chat/generate-chat-session-id");
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function handleChatPrompt(data: any) {
  try {
    const response = await api.post("/chat/handle-prompt", data);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function getChatHistoryById(id: any) {
  try {
    const response = await api.get(`/chat/get-chat-history-session-id/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function getChatSummary() {
  try {
    const response = await api.get(`/chat/get-all-chat-summaries`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function createNewPatient(data: any) {
  try {
    const response = await api.post("/chat/create-patient", data);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function getPatients() {
  try {
    const response = await api.get(`/chat/get-patients`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function getPatientChatById(id: any) {
  try {
    const response = await api.get(`/chat/get-chat-history/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function removePatientById(data: any) {
  try {
    const response = await api.post(`/chat/remove-patient`, data);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function getChatLimit() {
  try {
    const response = await api.get(`/chat/get-free-messages-count`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}
