import http from "../../../utils/http";

const URL = "/transactions";

interface GetAllProps {
  page?: number;
  limit?: number;
  filters?: {
    name?: string;
  };
}

async function getAll({
  page,
  limit,
  filters,
}: GetAllProps) {
  let uri = URL;
  if (page) uri += `?page=${page}`;
  if (limit) uri += `&limit=${limit}`;
  if (filters?.name) uri += `&name=${filters.name}`;
  return await http.get(uri);
}

export default {
  getAll,
};
