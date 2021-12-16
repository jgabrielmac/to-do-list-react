import React from "react";
import "./search.css";
import { Formik, Form } from "formik";
import CircularProgress from "@mui/material/CircularProgress";

const SearchBar = ({ onSubmit, initialValues, loading }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange }) => (
        <Form className="form-container">
          <input
            name="item"
            value={values.item}
            onChange={handleChange}
            className="input-style"
            type="text"
            placeholder="Adicionar tarefa"
          />
          {!loading ? (
            <button type="submit" className="button-add">
              <span style={{ color: "white" }} className="material-icons">
                add
              </span>
            </button>
          ) : (
            <CircularProgress size={21} />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
