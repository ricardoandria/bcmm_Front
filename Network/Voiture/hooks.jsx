import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios";
import { BASE_URL } from "../../constants";
import { network } from "./network";

function useGetVoiture() {
  return useQuery(["voiture"], network.getVoitures);
}

function useDeleteVoiture() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${BASE_URL}/voiture/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["voiture"]);
      },
    }
  );
}

const addVoiture = (voiture) => {
  return axios.post(`${BASE_URL}/voiture`, voiture);
};

function useAddVoitures() {
  const queryClient = useQueryClient();

  return useMutation(addVoiture, {
    onSuccess: () => {
      queryClient.invalidateQueries(["voiture"]);
    },
  });
}

const updateVoiture = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (value) => await axios.put(`${BASE_URL}/voiture/${id}`, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["voiture"]);
      },
    }
  );
};

const fetchVoiture = async (voitureId) => {
  return await axios.get(`${BASE_URL}/voiture/${voitureId}`);
};

const useGetVoitureById = (voitureId) => {
  return useQuery(["voiture", voitureId], () => fetchVoiture(voitureId));
};

export {
  useDeleteVoiture,
  useGetVoiture,
  useAddVoitures,
  updateVoiture,
  useGetVoitureById,
};
