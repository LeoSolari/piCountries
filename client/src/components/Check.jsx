import React from "react";
import { useDispatch } from "react-redux";
import { errorClose } from "../redux/actions";

const Check = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(errorClose());
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={handleClick}>X</button>
        </div>
        <div>
          <h1>Actividad Creada!</h1>
        </div>
        <div>
          <img alt="check" />
        </div>
      </div>
    </div>
  );
};

export default Check;
