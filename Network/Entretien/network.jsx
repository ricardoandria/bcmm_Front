import api from "../../axios";

export const network = {
  async getEntretiens() {
    const { data } = await api.get("/entretien");

    return data;
  },
};
