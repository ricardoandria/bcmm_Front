import api from "../../axios";

export const network = {
  async getMotos() {
    const { data } = await api.get("/moto");

    return data;
  },
};
