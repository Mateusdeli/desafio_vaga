import http from "../../../utils/http";

const URL = "/transactions/import";

async function upload(data: any) {
  return await http.post(URL, data);
}

export default {
  upload,
};
