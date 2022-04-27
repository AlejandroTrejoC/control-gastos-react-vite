import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [fecha, setFecha] = useState("");
    const [id, setId] = useState("");

    const cerrarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios");
            setTimeout(() => {
                setMensaje("");
            }, 3000);
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, fecha, id });
    };

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha);
            setId(gastoEditar.id);
        }
    }, []);

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={cerrarModal}
                    className=""
                />
            </div>
            <form
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
            >
                <legend>
                    {gastoEditar.nombre ? "Ediatr Gasto" : "Nuevo Gasto"}
                </legend>

                {mensaje && <Mensaje mensaje={mensaje} tipo={"error"} />}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        placeholder="Anade el nombre del gasto"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cabtidad</label>
                    <input
                        type="number"
                        placeholder="Anade la cantidad del gasto"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                    <input
                        type="submit"
                        value={
                            gastoEditar.nombre
                                ? "Guardar cambios"
                                : "Anadir Gasto"
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default Modal;
