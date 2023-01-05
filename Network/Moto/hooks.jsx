import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios";
import { BASE_URL } from "../../constants";
import { network } from "./network";

function useGetMoto() {
  return useQuery(["Moto"], network.getMotos);
}

function useDeleteMoto() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${BASE_URL}/moto/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Moto"]);
      },
    }
  );
}

const addMoto = (Moto) => {
  return axios.post(`${BASE_URL}/moto`, Moto);
};

function useAddMotos() {
  const queryClient = useQueryClient();

  return useMutation(addMoto, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Moto"]);
    },
  });
}

const updateMoto = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (value) => await axios.put(`${BASE_URL}/Moto/${id}`, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Moto"]);
      },
    }
  );
};

const fetchMoto = async (MotoId) => {
  return await axios.get(`${BASE_URL}/moto/${MotoId}`);
};

const useGetMotoById = (MotoId) => {
  return useQuery(["Moto", MotoId], () => fetchMoto(MotoId));
};

export { useDeleteMoto, useGetMoto, useAddMotos, updateMoto, useGetMotoById };
