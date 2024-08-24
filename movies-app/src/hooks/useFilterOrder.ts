import { Order } from "@/types/order";
import { useState } from "react";

export const useFilterOrder = () => {
  const [order] = useState<Order[]>([
    { label: 'Título asc.', map: "original_title.asc" },
    { label: 'Título desc.', map: "original_title.desc" },
    { label: 'Popularidade asc', map: "popularity.asc" },
    { label: 'Popularidade desc', map: "popularity.desc" },
    { label: 'Média de votos asc', map: "vote_average.asc" },
    { label: "Média de votos desc", map: "vote_average.desc" },
    { label: 'Data de lançamento asc', map: "primary_release_date.asc" },
    { label: 'Data de lançamento desc', map: "primary_release_date.desc" },
  ]);

  return { order };
};

