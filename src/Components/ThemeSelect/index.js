import React from "react";
import "./theme.css";
import CircularProgress from "@mui/material/CircularProgress";

const ThemeSelect = ({
  inputColor,
  color,
  changeColor,
  optionsColor,
  loading,
  colorStatus,
}) => {
  const [openModalColors, setOpenModalColors] = React.useState(false);
  const [inputNewColor, setInputNewColor] = React.useState(false);
  const [hexColor, setHexColor] = React.useState("");
  const obj = document.getElementById("selected-background");
  if (obj && color) {
    obj.style.backgroundColor = color;
  }
  function isHexaColor(sNum) {
    return (
      typeof sNum === "string" &&
      sNum.length === 6 &&
      !isNaN(parseInt(sNum, 16))
    );
  }

  React.useEffect(() => {
    colorStatus === 201 && setInputNewColor(false);
  }, [colorStatus]);

  return (
    <div className="container-end">
      <div className="container">
        <div className="theme-container">
          <span>Tema</span>
          <button onClick={() => setOpenModalColors(!openModalColors)}>
            <div id="selected-background" />
          </button>
        </div>
        {openModalColors && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div className="colors-options">
              {!loading && optionsColor.length > 0 ? (
                optionsColor.map((color) => (
                  <button
                    key={color.id}
                    className="color"
                    onClick={() => {
                      changeColor(color.name);
                      setOpenModalColors(false);
                    }}
                  >
                    <div
                      style={{ backgroundColor: color.name }}
                      id="selected-background"
                    />
                  </button>
                ))
              ) : (
                <div className="circular-container">
                  <CircularProgress size={21} />
                </div>
              )}
              {!loading && (
                <button onClick={() => setInputNewColor(!inputNewColor)}>
                  <div className="color-add" id="selected-background">
                    <span style={{ color: "black" }} className="material-icons">
                      add
                    </span>
                  </div>
                </button>
              )}
            </div>
            {inputNewColor && !loading && (
              <div className="add-color-container">
                <div className="add-color-input">
                  <input
                    value={hexColor}
                    onChange={(e) =>
                      setHexColor(e.target.value.substring(0, 6))
                    }
                    type="text"
                    placeholder="Hexadecimal"
                  />
                  <button
                    disabled={hexColor.length < 6 && !isHexaColor(hexColor)}
                    onClick={() =>
                      isHexaColor(hexColor) && inputColor(hexColor)
                    }
                  >
                    <span
                      style={{ color: "black", fontSize: 21 }}
                      className="material-icons"
                    >
                      send
                    </span>
                  </button>
                </div>
                {hexColor.length === 6 && !isHexaColor(hexColor) && (
                  <p className="error-message">Cor inválida</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSelect;
