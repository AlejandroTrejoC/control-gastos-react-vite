import React from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatearFecha } from "../helpers";

import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    varios: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
};

const Gasto = ({ key, gasto, setGastoEditar, eliminarGasto }) => {
    const { categoria, nombre, cantidad, fecha, id } = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => {
                    setGastoEditar(gasto);
                }}
            >
                Editar
            </SwipeAction>
        </LeadingActions>
    );
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => {
                    eliminarGasto(id);
                }}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={diccionarioIconos[categoria]}
                            alt="Icono gasto"
                        />

                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fehca-gasto">
                                Agregando el {""}
                                <span>{formatearFecha(fecha)}</span>
                            </p>
                        </div>
                        <p className="cantidad-gato">$ {cantidad}</p>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

export default Gasto;
