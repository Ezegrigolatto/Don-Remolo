import "./comidas.css"
import Nav from "../nav/nav"
import Agua from "../../assets/agua.jpg"
import Almendrado from "../../assets/almendrado.jpg"
import Bombones from "../../assets/bombones.jpg"
import Cerveza from "../../assets/cerveza.jpg"
import EmpanadaAtun from "../../assets/empanada_atun.jpg"
import EmpanadaCarne from "../../assets/empanada_carne.jpg"
import EmpanadaJamonyQueso from "../../assets/empanada_jamonyqueso.jpg"
import Gaseosa from "../../assets/gaseosa.jpg"
import Helado from "../../assets/helado.jpg"
import JamonyMorron from "../../assets/jamonymorron.jpg"
import Muzzarella from "../../assets/muzzarella.jpg"
import Napolitana from "../../assets/napolitana.jpg"
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { enviarCompras } from "../../redux/actions";
import {BsFillArrowUpCircleFill} from "react-icons/bs";
import Bebidas from "../../assets/botellas-de-vino.png"
import Postres from "../../assets/dulces.png"
import Empanadas from "../../assets/empanada.png"
import Pizzas from "../../assets/pizza.png"


export default function Comidas() {
    const estado = useSelector((state) => state.carrito);
    const [comidas, setComidas] = useState(estado);
    const dispatch = useDispatch();
    
   

    // useEffect(() => {
    //   mostrarboton();
    // }, []);

    const añadirCompra = (e) => {
      if (!comidas?.hasOwnProperty(e.target.id)) {
        setComidas({
          ...comidas,
          [e.target.id]: {
            nombre: e.target.id,
            cantidad: 1,
            precio: parseInt(e.target.value),
            precioUnitario:parseInt(e.target.value)
          },
        });
      } else {
        setComidas({
          ...comidas,
          [e.target.id]: {
            ...comidas[e.target.id],
            cantidad: comidas[e.target.id].cantidad + 1,
            precio: (comidas[e.target.id].cantidad + 1)*e.target.value,
            precioUnitario: parseInt(e.target.value)
          },
        });
      }
    }

    const añadirDoce = (e) => {
      if (!comidas?.hasOwnProperty(e.target.id)) {
        setComidas({
          ...comidas,
          [e.target.id]: {
            nombre: e.target.id,
            cantidad: 12,
            precio: parseInt(e.target.value)*12,
            precioUnitario:parseInt(e.target.value)
          },
        });
      } else {
        setComidas({
          ...comidas,
          [e.target.id]: {
            ...comidas[e.target.id],
            cantidad: comidas[e.target.id].cantidad + 12,
            precio: (comidas[e.target.id].cantidad + 12)*e.target.value,
            precioUnitario: parseInt(e.target.value)
          },
        });
      }
    }
    useEffect(() => {
      dispatch(enviarCompras(comidas));
    }, [comidas]);


  return (
    <div className="comidasContainer" id="inicio">
      <Nav/>
        <h1>Nuestro menú</h1>
        <h4>Ahora podes comprar desde tu casa y pasas a retirar cuando nos indiques.</h4>
        <div className="acontainer">
        <a className="a" id="com" href="#pizzas"><img src={Pizzas}></img> Pizzas</a>
        <a className="a" id="com" href="#empanadas"><img src={Empanadas}></img> Empanadas</a>
        <a className="a" id="beb" href="#bebidas"><img src={Bebidas}></img> Bebidas</a>
        <a className="a" id="post"href="#postres"><img src={Postres}></img> Postres </a>
        </div>
      <div  className="comidas">
        <h1 id="pizzas">Pizzas</h1>
        <hr className="hr"/>
        <div className="comida">
        <img src={Muzzarella} alt=""/>
        <span>
        <h2>Muzzarella</h2>
        <p>Salsa de tomate, Muzzarella, orégano y aceitunas.</p>
        <p>$300</p>
        </span>
        <button onClick={añadirCompra} value="300" id="Muzzarella" className="añadir"> Añadir al carrito </button>
        </div>
        <div className="comida">
        <img src={JamonyMorron} alt=""/>
        <span>
        <h2>Jamón y morrón</h2>
        <p>Salsa de tomate, jamón, morrón, orégano y aceitunas.</p>
        <p>$370</p>
        </span>
        <button onClick={añadirCompra} value="370" id= "Jamón y morrón" className="añadir"> Añadir al carrito </button>
        </div>
        <div className="comida">
        <img src={Napolitana} alt=""/>
        <span>
        <h2>Napolitana</h2>
        <p>Salsa de tomate, tomate natural, jamón, queso Muzzarella rallado, albahaca y aceitunas.</p>
        <p>$400</p>
        </span>
        <button onClick={añadirCompra} value="400" id= "Napolitana" className="añadir"> Añadir al carrito </button>
        </div>


        <h1 id="empanadas">Empanadas</h1>
        <hr className="hr"/>
        <div className="comida">
        <img src={EmpanadaCarne} alt=""/>
        <span>
        <h2>Empanada de carne</h2>
        <p>Empanadas de carne cortada a cuchillo, morron y huevos.</p>
        <p>$50 la unidad</p>
        </span>
        <button onClick={añadirCompra} value="50" id= "Emp. carne" className="unidad"> Añadir una </button>
        <button onClick={añadirDoce} value="50" id= "Emp. carne" className="docena"> Añadir docena </button>
        </div>
        <div className="comida">
        <img src={EmpanadaJamonyQueso} alt=""/>
        <span>
        <h2>Empanada jamón y queso</h2>
        <p>Empanadas de jamón y queso.</p>
        <p>$45 la unidad</p>
        </span>
        <button onClick={añadirCompra} value="45" id= "Emp. JyQ" className="unidad"> Añadir una </button>
        <button onClick={añadirDoce} value="45" id= "Emp. JyQ" className="docena"> Añadir docena </button>
        </div>
        <div className="comida">
        <img src={EmpanadaAtun} alt=""/>
        <span>
        <h2>Empanada de atún</h2>
        <p>Empanadas de atún con especias.</p>
        <p>$40 la unidad</p>
        </span>
        <button onClick={añadirCompra} value="40" id= "Emp. atún" className="unidad"> Añadir una </button>
        <button onClick={añadirDoce} value="40" id= "Emp. atún" className="docena"> Añadir docena </button>
        </div>


        <h1 id="bebidas">Bebidas</h1>
        <hr className="hr"/>
        <div className="comida">
        <img src={Agua} alt=""/>
        <span>
        <h2>Agua</h2>
        <p>Agua mineral con o sin gas 500cc.</p>
        <p>$100</p>
        </span>
        <button onClick={añadirCompra} value="100" id= "Agua" className="añadir"> Añadir al carrito </button>
        </div>
        <div className="comida">
        <img src={Gaseosa} alt=""/>
        <span>
        <h2>Gaseosa</h2>
        <p>Gaseosa de cola, naranja o lima-limón 375cc.</p>
        <p>$140</p>
        </span>
        <button onClick={añadirCompra} value="140" id= "Gaseosa" className="añadir"> Añadir al carrito </button>
        </div>
        <div className="comida">
        <img src={Cerveza} alt=""/>
        <span>
        <h2>Cerveza</h2>
        <p>Cerveza en lata 473cc.</p>
        <p>$160</p>
        </span>
        <button onClick={añadirCompra} value="160" id= "Cerveza" className="añadir"> Añadir al carrito </button>
        </div>


        <h1 id="postres">Postres</h1>
        <hr className="hr"/>
        <div className="comida">
        <img src={Helado} alt=""/>
        <span>
        <h2>Helado</h2>
        <p>Palito helado de vainilla bañado en chocolate.</p>
        <p>$80 c/u</p>
        </span>
        <button onClick={añadirCompra} value="80" id= "Helado" className="añadir"> Añadir al carrito </button>
        </div>
        <div className="comida">
        <img src={Almendrado} alt=""/>
        <span>
        <h2>Almendrado</h2>
        <p> Postre helado almendrado.</p>
        <p>$500</p>
        </span>
        <button onClick={añadirCompra} value="500" id= "Almendrado" className="añadir"> Añadir al carrito </button>
        </div>
        <div className="comida">
        <img src={Bombones} alt=""/>
        <span>
        <h2>Bombones</h2>
        <p>Bombones de chocolate.</p>
        <p>$100 c/u</p>
        </span>
        <button onClick={añadirCompra} value="100" id= "Bombones" className="añadir"> Añadir al carrito </button>
        </div>        
      </div>
      <a id="subir" className="inicio" href="#inicio"><BsFillArrowUpCircleFill className="inicioicon"/></a>
    </div>
  );
}
