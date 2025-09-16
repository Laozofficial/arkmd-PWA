import api from "../interceptor";

export async function getAllPlan() {
  try {
    const response = await api.get(`/payment/get-plans`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}

export async function getUserPlan() {
  try {
    const response = await api.get(`/payment/get-user-plan`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
  }
}
