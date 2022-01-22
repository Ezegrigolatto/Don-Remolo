import { BsCart2 } from "react-icons/bs";
import "./carrito.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { enviarCompras } from "../../redux/actions";
import { Link } from "react-router-dom"

export default function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const [contador, setContador] = useState(0);
  const [total, setTotal] = useState(0);
  const [carritoarr, setCarritoarr] = useState([]);
  const dispatch = useDispatch();

 
  useEffect(() => {
    contadorCarrito();
  }, [carrito]);

  useEffect(() => {
    mostrarCarrito();
  },[contador])

  const contadorCarrito = () => {
    let suma = 0;
    for (let sum in carrito) {
      suma += carrito[sum].cantidad;
    }
    setContador(suma);
  };

  const mostrarCarrito = () => {
    let carritoMostrar = [];
    let suma=0;
    for (let x in carrito) {
      carritoMostrar.push(carrito[x]);
    }
    setCarritoarr(carritoMostrar);
    carritoMostrar.forEach((element) => {
        suma = suma + element.precio;
        });
    setTotal(suma);
  };

  const modificarCantidad = (e) => {
    e.preventDefault();
    if(e.target.id === "-") {
      if(carrito[e.target.name].cantidad === 1) {
        return;
      }
      carrito[e.target.name].cantidad--;
      carrito[e.target.name].precio= carrito[e.target.name].precio - carrito[e.target.name].precioUnitario
      contadorCarrito()
      dispatch(enviarCompras(carrito))
    }
    if(e.target.id === "+") {
      carrito[e.target.name].cantidad++;
      carrito[e.target.name].precio= parseInt(carrito[e.target.name].precio) + parseInt(carrito[e.target.name].precioUnitario)
      contadorCarrito()
      dispatch(enviarCompras(carrito))
    }
  }

  const eliminarProducto = (e) => {
    e.preventDefault();
    delete carrito[e.target.name]
    contadorCarrito()
    dispatch(enviarCompras(carrito))
  }

  return (
    <div className="carritoContainer">
        <input type="checkbox" id="checkbox"></input>
      <label htmlFor="checkbox"><BsCart2 className="carrito" /></label>
      <div className="contador">{contador}</div>
      <div className="contenedor">
        <h3>Carrito</h3>
        <div className="carritoMostrar">
          {contador > 0 ? (
            carritoarr.map((comida) => {
              return (
                <div key={comida.nombre} className="elementos">
                  <b>{comida.nombre}</b>
                    <p>Cantidad:</p>
                  <div className="cantidad">
                    <button className="cantidades" onClick={modificarCantidad} name={comida.nombre} id="-">-</button>
                    {comida.cantidad} 
                  <button className="cantidades" onClick={modificarCantidad} name={comida.nombre} id="+">+</button>
                  </div>
                    <p>${comida.precio}</p>
                  <button className="quitar" onClick={eliminarProducto} name={comida.nombre}>Eliminar producto</button>
                  <hr className="separadorcarrito" />
                </div>
              );
            })
          ) : (
            <p>El carrito está vacío.</p>
          )}
        </div>
        <Link className="total" to="/confirmar-pedido"><button className="total"> <b>COMPRAR (Total: ${total}) </b> </button></Link>
      </div>
      <label htmlFor="checkbox" className="cover">
      </label>
    </div>
  );
}
