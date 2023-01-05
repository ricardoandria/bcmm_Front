import api from "../../axios";

export const network = {
  async getParcours() {
    const { data } = await api.get("/voyage");

    return data;
  },
};
