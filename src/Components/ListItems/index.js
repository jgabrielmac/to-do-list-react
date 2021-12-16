import React from "react";
import "./list.css";

const ListItems = ({ list, onDelete }) => {
  return (
    <div className="list-container">
      {list.length > 0 ? (
        list.map((item) => (
          <div key={item.id}>
            <div className="item">
              <p className="item-name">{item.name}</p>
              <button onClick={() => onDelete({ item })}>
                <span style={{ color: "gray" }} className="material-icons">
                  delete
                </span>
              </button>
            </div>
            <hr className="solid" />
          </div>
        ))
      ) : (
        <span>Nenhuma anotação ainda :(</span>
      )}
    </div>
  );
};

export default ListItems;
