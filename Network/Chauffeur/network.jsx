import api from "../../axios";

export const network = {
  async getChauffeurs() {
    const { data } = await api.get("/chauffeur");

    return data;
  },
};
