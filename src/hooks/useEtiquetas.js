import { catamarcaApi } from "api/catamarcaApi";
import { useQuery } from "react-query";

export const useEtiquetas = () => {
    return useQuery("etiquetas", async () => {
      const { data } = await catamarcaApi.get("/items/etiquetas_noticias");
      return data.data;
    });
  };