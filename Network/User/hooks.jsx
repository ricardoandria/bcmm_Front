import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios";
import { BASE_URL } from "../../constants";
import { network } from "./network";

const registers = (user) => {
  return axios.post(`${BASE_URL}/user/register`, user);
};

function useRegister() {
  const queryClient = useQueryClient();

  return useMutation(registers, {
    onSuccess: () => {
      queryClient.invalidateQueries(["register"]);
    },
  });
}

const login = (user) => {
  return axios.post(`${BASE_URL}/user/login`, user);
};

function useLogin() {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["login"]);
    },
  });
}

export { useRegister, useLogin };
