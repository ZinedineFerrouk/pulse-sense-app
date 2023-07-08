import { API_URL } from "@env";

export const getStatsByUser = async (userId, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const response = await fetch(`${API_URL}/admin/get-stats-by-user/` + userId, requestOptions);
    const result = await response.json();

    return result;
};

export const userRegister = async (email, firstName, lastName, password) => {
  const requestBody = {
    email,
    firstName,
    lastName,
    password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };

  const response = await fetch(`http://192.168.0.35:8000/register`, requestOptions);
  const result = await response.json();

  return result;
};