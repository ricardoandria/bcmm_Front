import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../axios";
import { BASE_URL } from "../../constants";
import { network } from "./network";

function useGetEntretien() {
  return useQuery(["Entretien"], network.getEntretiens);
}

function useDeleteEntretien() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => {
      return axios.delete(`${BASE_URL}/Entretien/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Entretien"]);
      },
    }
  );
}

const addEntretien = (Entretien) => {
  return axios.post(`${BASE_URL}/entretien`, Entretien);
};

function useAddEntretiens() {
  const queryClient = useQueryClient();

  return useMutation(addEntretien, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Entretien"]);
    },
  });
}

const updateEntretien = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (value) => await axios.put(`${BASE_URL}/Entretien/${id}`, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Entretien"]);
      },
    }
  );
};

const fetchEntretien = async (EntretienId) => {
  return await axios.get(`${BASE_URL}/Entretien/${EntretienId}`);
};

const useGetEntretienById = (EntretienId) => {
  return useQuery(["Entretien", EntretienId], () =>
    fetchEntretien(EntretienId)
  );
};

export {
  useDeleteEntretien,
  useGetEntretien,
  useAddEntretiens,
  updateEntretien,
  useGetEntretienById,
};
