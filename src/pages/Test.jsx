import React, { useState } from "react";
import DestinasiFavoritBtn from "../components/DestinasiFavoritBtn";

const Test = () => {
  const [selected, setSelected] = useState("Semua");

  const handleClick = (text) => {
    setSelected(text);
  };

  return (
    <div className="flex gap-4">
      {["Semua", "Asia", "Amerika", "Australia", "Eropa", "Afrika"].map(
        (text) => (
          <DestinasiFavoritBtn
            key={text}
            text={text}
            selected={selected === text}
            onClick={() => handleClick(text)}
          />
        )
      )}
    </div>
  );
};

export default Test;
