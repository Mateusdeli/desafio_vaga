import React, { useEffect, useState } from "react";
import transactionService from "../services/transaction.service";
import importService from "../services/import.service";
import formatUtil from "../../../utils/format.util";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState("");
  const [file, setFile] = useState(null);
  const limit = 10;
  const totalPages = Math.ceil(totalItems / limit);

  useEffect(() => {
    getAllTransactions();
  }, [currentPage]);

  async function getAllTransactions(filters?: any) {
    try {
      const { transactions, total } = await transactionService.getAll({
        page: currentPage,
        limit: limit,
        filters,
      });
      setTotalItems(total);
      setTransactions(transactions);
    } catch (error) {
      alert(error);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  function handleOnChange(event) {
    const { value } = event.target;
    setFilter(value);
  }

  async function handleFilter() {
    if (!filter) return;
    setCurrentPage(1);
    await getAllTransactions({ name: filter });
    setFilter("");
  }

  function handleOnChangeUpload(event) {
    const { files } = event.target;
    if (!files) return;
    setFile(files[0]);
  }

  async function upload() {
    if (!file) {
      alert("Arquivo não selecionado para realizar o upload");
    }
    try {
      const formData = new FormData();
      formData.append("transactions", file);
      setFile(null);
      await importService.upload(formData);
      await getAllTransactions();
    } catch (error) {
      alert(error);
    }
  }

  function formatCnpjCpf(cpfCnpj: string) {
    if (!cpfCnpj) return cpfCnpj;
    if (cpfCnpj.length === 11) {
      return formatUtil.toCPF(cpfCnpj);
    }
    return formatUtil.toCNPJ(cpfCnpj);
  }

  return (
    <div>
      <div>
        <input
          accept=".txt"
          type="file"
          name="transactions"
          id="transactions"
          onChange={handleOnChangeUpload}
        />
        <button onClick={upload}>Importar</button>
      </div>
      <div>
        <input type="text" value={filter} onChange={handleOnChange} />
        <button onClick={handleFilter}>Filtrar</button>
        <table>
          <thead>
            <tr>
              <th>Transação</th>
              <th>Valor</th>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction?.id}</td>
                <td>{transaction?.price}</td>
                <td>{transaction?.customer[0]?.name}</td>
                <td>{formatCnpjCpf(transaction?.customer[0]?.cpfCnpj)}</td>
                <td>{formatUtil.toDate(transaction?.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próximo
        </button>
        </div>
      </div>
    </div>
  );
}
