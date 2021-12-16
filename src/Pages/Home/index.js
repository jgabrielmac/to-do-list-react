import React from "react";
import "./home.css";
import { Container } from "./styles";
import ThemeSelect from "../../Components/ThemeSelect";
import SnackBar from "../../Components/SnackBar";
import ListItems from "../../Components/ListItems";
import SearchBar from "../../Components/SearchBar";
import useList from "../../Requests/list";
import useColors from "../../Requests/colors";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const {
    message,
    setMessage,
    list,
    status,
    loading,
    loadingList,
    addItem,
    getList,
    deleteItem,
  } = useList();
  const {
    loadingList: loadColorList,
    colors,
    getColors,
    getSelectedColor,
    selectedColor,
    changeColor,
    addColor,
    status: colorStatus,
    setStatus: setColorStatus,
  } = useColors();
  const { color } = selectedColor;
  const [selectedBackground, setSelectedBackground] = React.useState("#e3b90c");

  React.useEffect(() => {
    color && setSelectedBackground(color.name);
  }, [color]);
  const [openMessage, setOpenMessage] = React.useState(false);

  React.useEffect(() => {
    message && setOpenMessage(true);
  }, [message]);

  React.useEffect(() => {
    if (openMessage) {
      setTimeout(() => {
        setMessage("");
        setOpenMessage(false);
      }, 2000);
    }
  }, [openMessage, setMessage]);

  React.useEffect(() => {
    if (colorStatus === 201) {
      setColorStatus("");
    }
  }, [colorStatus]);

  const initialValues = {
    item: "",
  };
  const onSubmit = (data, { resetForm }) => {
    addItem({ item: data.item });
    resetForm({ item: "" });
  };

  const fetchItems = React.useCallback(() => {
    getColors();
    getList();
    getSelectedColor();
  }, []);

  React.useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const changeLocalColor = (color) => {
    setSelectedBackground(color);
    changeColor({ item: color });
  };

  const inputColor = (color) => {
    addColor({ item: `#${color}` });
  };

  return (
    <Container backgroundColor={selectedBackground}>
      <ThemeSelect
        inputColor={inputColor}
        optionsColor={colors}
        color={selectedBackground}
        loading={loadColorList}
        changeColor={changeLocalColor}
        colorStatus={colorStatus}
      />
      <div className="aligned-container">
        <div className="central-container">
          <p id="title">To Do List</p>
          <SearchBar
            onSubmit={onSubmit}
            initialValues={initialValues}
            loading={loading}
          />
          {!loadingList ? (
            <ListItems list={list} onDelete={deleteItem} />
          ) : (
            <CircularProgress size={21} />
          )}
        </div>
        <SnackBar
          openMessage={openMessage}
          message={message}
          type={status !== 200 && status !== 201 && "error"}
        />
      </div>
    </Container>
  );
};

export default Home;
