import React from "react";
import api from "../services/api";

const useList = () => {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [loadingList, setLoadingList] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const getList = async () => {
    setLoadingList(true);
    try {
      const response = await api.get("/list");
      if (response.status !== 200 && response.status !== 201) throw response;
      setTimeout(() => {
        setList(response.data);
        setLoadingList(false);
        setStatus(response.status);
      }, 1000);
    } catch (error) {
      setLoadingList(false);
      setMessage(error.statusText);
      setStatus(error.status);
    }
  };

  const addItem = async ({ item }) => {
    setLoading(true);
    try {
      const response = await api.post("/list", { name: item });
      if (response.status !== 200 && response.status !== 201) throw response;
      getList();
      setTimeout(() => {
        setLoading(false);
        setMessage('Adicionado com sucesso');
        setStatus(response.status);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage(error.statusText);
      setStatus(error.status);
    }
  };

  const deleteItem = async ({ item }) => {
    setLoadingDelete(true);
    try {
      const response = await api.delete(`/list/${item.id}`);
      if (response.status !== 200 && response.status !== 201) throw response;
      getList();
      setTimeout(() => {
        setLoadingDelete(false);
        setMessage("Deletado com Sucesso");
        setStatus(response.status);
      }, 1000);
    } catch (error) {
      setLoadingDelete(false);
      setMessage(error.statusText);
      setStatus(error.status);
    }
  };

  return {
    list,
    status,
    message,
    loading,
    loadingList,
    loadingDelete,
    addItem,
    getList,
    deleteItem,
    setMessage,
  };
};

export default useList;
