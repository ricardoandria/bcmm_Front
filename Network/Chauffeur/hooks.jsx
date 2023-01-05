import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios";
import { BASE_URL } from "../../constants";
import { network } from "./network";

function useGetChauffeur() {
  return useQuery(["Chauffeur"], network.getChauffeurs);
}

function useDeleteChauffeur() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${BASE_URL}/chauffeur/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Chauffeur"]);
      },
    }
  );
}

const addChauffeur = (Chauffeur) => {
  return axios.post(`${BASE_URL}/chauffeur`, Chauffeur);
};

function useAddChauffeurs() {
  const queryClient = useQueryClient();

  return useMutation(addChauffeur, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Chauffeur"]);
    },
  });
}

const updateChauffeur = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (value) => await axios.put(`${BASE_URL}/Chauffeur/${id}`, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Chauffeur"]);
      },
    }
  );
};

const fetchChauffeur = async (ChauffeurId) => {
  return await axios.get(`${BASE_URL}/chauffeur/${ChauffeurId}`);
};

const useGetChauffeurById = (ChauffeurId) => {
  return useQuery(["Chauffeur", ChauffeurId], () =>
    fetchChauffeur(ChauffeurId)
  );
};

export {
  useDeleteChauffeur,
  useGetChauffeur,
  useAddChauffeurs,
  updateChauffeur,
  useGetChauffeurById,
};
