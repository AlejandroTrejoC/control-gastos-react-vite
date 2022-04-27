import React from "react";

const Mensaje = ({mensaje, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>{mensaje}</div>
    )
};

export default Mensaje;
