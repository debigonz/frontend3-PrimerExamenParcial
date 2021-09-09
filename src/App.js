import React, { Component } from "react";
import Opciones from "./components/Opciones/Opciones";
import Recordatorio from "./components/Recordatorio/Recordatorio";
import data from "./components/data.json"
import "./index.css";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
      seleccionAnterior: "",
      dataIdActual: "1",
      historial: [],
      data : data
    };

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contador !== this.state.contador) {
      this.setState(prevState => ({
        historial: [...prevState.historial, this.state.seleccionAnterior]
      }))
    }
    
  }

  handleClick = (e) => {
    const id = e.target.id;
    let idActual = e.target.value;
    const numero = parseInt(idActual.charAt(0));
    if (idActual == this.state.data[this.state.data.length - 1].id || idActual == this.state.data[this.state.data.length - 2].id ) {
      alert("Fin.");
    } else {
      idActual = (numero + 1).toString() + id.toLowerCase()
        
      this.setState({
        contador : parseInt(numero) + 1,
        seleccionAnterior : id,
        dataIdActual : idActual
      })
    }
  };

  render() {
    const historiaFiltrada = this.state.data.filter((historia)=>{
      return historia.id === this.state.dataIdActual
    });
    return (
      <div className="layout">
        <h2 className="historia">{historiaFiltrada[0].historia}</h2>
        <Opciones
          handleClick={this.handleClick}
          opcionA={historiaFiltrada[0].opciones.a}
          opcionB={historiaFiltrada[0].opciones.b}
          idActual={this.state.dataIdActual}
        />
        <Recordatorio
          seleccionAnterior={this.state.seleccionAnterior}
          historial={this.state.historial.map(
            (e, index) => (
              <li key={index}>{e}</li>
            )
            //historiaFiltrada.id
          )}
        />
      </div>
    );
  }
}

