import { useState, useEffect } from "react";
import Header from "./Components/Header";
import ListadoGastos from "./Components/ListadoGastos";
import Filtros from "./Components/Filtros";
import Modal from "./Components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

const App = () => {
    const [gastos, setGastos] = useState(
        localStorage.getItem("gastos")
            ? JSON.parse(localStorage.getItem("gastos"))
            : []
    );

    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem("presupuesto")) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);

    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState("");
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    const handleNuevoGasto = () => {
        setModal(true);

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    const guardarGasto = (gasto) => {
        if (gasto.id) {
            const gastosActualizados = gastos.map((gastoState) =>
                gastoState.id === gasto.id ? gasto : gastoState
            );
            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setModal(false);
        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter(
            (gastoState) => gastoState.id !== id
        );
        setGastos(gastosActualizados);
    };

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);

    useEffect(() => {
        localStorage.setItem("presupuesto", presupuesto ?? 0);
    }, [presupuesto]);

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
    }, [gastos]);

    useEffect(() => {
        if (filtro) {
            // Filtrar gastos por categoria
            const gastosFiltrados = gastos.filter(
                (gasto) => gasto.categoria === filtro
            );
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro]);

    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            setGastoEditar={setGastoEditar}
                            gastos={gastos}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>

                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Icono nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
};

export default App;
