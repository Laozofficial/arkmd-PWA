import api from "../interceptor";

export interface signUpProps {
  email: string;
  password: string;
  password_confirmation: string;
}

export async function registerUser(data: signUpProps) {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function loginUser(data: any) {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function forgetPassword(data: any) {
  try {
    const response = await api.post("/auth/forget-password", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function createPassword(data: any) {
  try {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function changePassword(data: any) {
  try {
    const response = await api.post("/user/change-password", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}

export async function createUserType(data: any) {
  try {
    const response = await api.post("/users/store-user-type", data);
    return response.data;
  } catch (error: any) {
    console.log(error.res);
  }
}
