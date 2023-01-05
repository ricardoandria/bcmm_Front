import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios";
import { BASE_URL } from "../../constants";
import { network } from "./network";

function useGetParcours() {
  return useQuery(["Parcours"], network.getParcours);
}

function useDeleteParcours() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${BASE_URL}/voyage/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Parcours"]);
      },
    }
  );
}

const addParcours = (Parcours) => {
  return axios.post(`${BASE_URL}/voyage`, Parcours);
};

function useAddParcours() {
  const queryClient = useQueryClient();

  return useMutation(addParcours, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Parcours"]);
    },
  });
}

const updateParcours = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (value) => await axios.put(`${BASE_URL}/voyage/${id}`, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Parcours"]);
      },
    }
  );
};

const fetchParcours = async (ParcoursId) => {
  return await axios.get(`${BASE_URL}/voyage/${ParcoursId}`);
};

const useGetParcoursById = (ParcoursId) => {
  return useQuery(["Parcours", ParcoursId], () => fetchParcours(ParcoursId));
};

export {
  useDeleteParcours,
  useGetParcours,
  useAddParcours,
  updateParcours,
  useGetParcoursById,
};
