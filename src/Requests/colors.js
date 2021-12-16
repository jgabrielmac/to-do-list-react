import React from "react";
import api from "../services/api";

const useColors = () => {
  const [colors, setColors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingList, setLoadingList] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState({
    loadingSelectedColor: false,
    color: "",
  });

  const getColors = async () => {
    setLoadingList(true);
    try {
      const response = await api.get("/colors");
      if (response.status !== 200 && response.status !== 201) throw response;
      setTimeout(() => {
        setColors(response.data);
        setLoadingList(false);
        setStatus(response.status);
      }, 1000);
    } catch (error) {
      setLoadingList(false);
      setMessage(error.statusText);
      setStatus(error.status);
    }
  };

  const getSelectedColor = async () => {
    setSelectedColor(true);
    try {
      const response = await api.get("/color_selected");
      if (response.status !== 200 && response.status !== 201) throw response;
      setSelectedColor({
        ...selectedColor,
        color: response.data,
        loadingSelectedColor: false,
      });
    } catch (error) {
      setSelectedColor({
        ...selectedColor,
        loadingSelectedColor: false,
      });
      setMessage(error.statusText);
    }
  };

  const changeColor = async ({ item }) => {
    setLoading(true);
    try {
      const response = await api.post("/color_selected", { name: item });
      if (response.status !== 200 && response.status !== 201) throw response;
      getColors();
      setTimeout(() => {
        setLoading(false);
        setStatus(response.status);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage(error.statusText);
      setStatus(error.status);
    }
  };

  const addColor = async ({ item }) => {
    setLoading(true);
    try {
      const response = await api.post("/colors", { name: item });
      if (response.status !== 200 && response.status !== 201) throw response;
      getColors();
      setTimeout(() => {
        setLoading(false);
        setMessage("Adicionado com sucesso");
        setStatus(response.status);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage(error.statusText);
      setStatus(error.status);
    }
  };

  return {
    colors,
    status,
    setStatus,
    message,
    loading,
    loadingList,
    addColor,
    getColors,
    setMessage,
    changeColor,
    getSelectedColor,
    selectedColor,
  };
};

export default useColors;
