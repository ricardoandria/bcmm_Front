import api from "../../axios";

export const network = {
  async getVoitures() {
    const { data } = await api.get("/voiture");
    return data;
  },

  async deleteVoitures(id) {
    const { data } = await api.delete(`/voiture/${id}`);
    return data;
  },
};
