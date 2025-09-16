import { CustomNotification } from "../../components/atoms/CustomNotification";
import api from "../interceptor";

export async function registerUser(data: any) {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    CustomNotification(
      "error",
      error.response.data.errors[0].message || "Something went wrong"
    );
  }
}

export async function loginUser(data: any) {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    CustomNotification(
      "error",
      error.response.data.message || "Something went wrong"
    );
  }
}

export async function forgetPassword(data: any) {
  try {
    const response = await api.post("/auth/forget-password", data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    CustomNotification(
      "error",
      error.response.data.errors[0].message || "Something went wrong"
    );
  }
}

export async function createPassword(data: any) {
  try {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  } catch (error: any) {
    CustomNotification(
      "error",
      error.response.data.message || "Something went wrong"
    );
  }
}

export async function changePassword(data: any) {
  try {
    const response = await api.post("/users/change-password", data);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    } else {
      CustomNotification(
        "error",
        error.response.data.message || "Something went wrong"
      );
    }
  }
}

export async function createUserType(data: any) {
  try {
    const response = await api.post("/users/store-user-type", data);
    return response.data;
  } catch (error: any) {
    CustomNotification(
      "error",
      error.response.data.message || "Something went wrong"
    );
  }
}
