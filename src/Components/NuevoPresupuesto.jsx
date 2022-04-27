import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
}) => {
    const [mensaje, setMensaje] = useState("");

    const handlePresupuesto = (e) => {
        e.preventDefault();
        if (!presupuesto || presupuesto < 0) {
            setMensaje("No es un presupuesto valido");

            return;
        }

        setMensaje("");
        setIsValidPresupuesto(true);
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label>Definir presupuesto</label>
                    <input
                        type="number"
                        placeholder="Anade tu presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(e.target.value)}
                        className="nuevo-presupuesto"
                    />
                </div>

                <input type="submit" value="Anadir" />

                {mensaje && <Mensaje mensaje={mensaje} tipo={"error"} />}
            </form>
        </div>
    );
};

export default NuevoPresupuesto;
