function toCNPJ(cnpj: string) {
  if (!cnpj) return cnpj;
  cnpj = cnpj.replace(/\D/g, "");
  return cnpj
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5");
}

function toCPF(cpf: string) {
  if (!cpf) return cpf;
  cpf = cpf.replace(/\D/g, "");
  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function toDate(date: string) {
  if (!date) return date;
  const data = new Date(date);

  const day = String(data.getUTCDate()).padStart(2, "0");
  const month = String(data.getUTCMonth() + 1).padStart(2, "0");
  const year = data.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export default {
  toCNPJ,
  toCPF,
  toDate,
};
