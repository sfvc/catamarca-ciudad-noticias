import { catamarcaApi } from "api/catamarcaApi";
import { useQuery } from "react-query";

export const useCategorias = () => {
    return useQuery("categorias", async () => {
      const { data } = await catamarcaApi.get("/items/categoria_noticia");
      return data.data;
    });
  };