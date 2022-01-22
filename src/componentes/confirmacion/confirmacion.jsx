import { useSelector, useDispatch} from "react-redux"
import { useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom"
import { resetearEstado } from "../../redux/actions";
import "./confirmacion.css"
import swal from "sweetalert"


export default function Confirmacion(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [total, setTotal] = useState([]);
    const [precioFinal, setPrecioFinal] = useState(0);
    const [orden, setOrden] = useState("");
    const carro= useSelector((state)=>state.carrito);
    const [inputs, setInputs] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        fecha: "",
        hora: ""
    })
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  const hh = today.getHours();
  const min = today.getMinutes();

  const minCondition= () => {
    return `${yyyy}-${mm.toString().padStart(2, "0")}-${dd.toString().padStart(2, "0")}`;
  };

  const maxCondition= () => {
    return `${yyyy}-${mm.toString().padStart(2, "0")}-${(dd+5).toString().padStart(2, "0")}`;
  };

  const horaCondition= () => {
    return `${hh.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  };


    useEffect(()=>{
      if(carro.length===0){
        console.log(carro)
        swal("No hay productos en el carrito", "", "warning")
        navigate("/")
      }
    },[])

    const controlarInputs = (e) =>{
      if(e.target.name==="telefono"){
        const esValido = e.target.validity.valid;
        if(esValido){
        setInputs({
          ...inputs,
          [e.target.name]: (e.target.value)
      })
    } else {
      swal("Este campo solo acepta numeros y deben ser 10 caracteres", "", "warning")
      return
    }
    }
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
    })
    }
      
    const mostrarCarrito = () => {
        let carritoMostrar = [];
        let precioF=0
        for (let x in carro) {
          carritoMostrar.push(carro[x]);
        }
        setTotal(carritoMostrar)
        carritoMostrar.forEach((e)=>{
            precioF=precioF + e.precio
        })
        setPrecioFinal(precioF)
      };
    
    useEffect(() => {
        mostrarCarrito();
    },[])

    const verificarHora = (e) => {
      console.log(e.target.validity.valid)
        if(inputs.fecha === minCondition()){
          const esValido = e.target.validity.valid;
          if(esValido){
          setInputs({
            ...inputs,
            [e.target.name]: (e.target.value)
        })
      } else {
        swal("La hora debe ser mayor a la actual", "", "warning")
        return
      }
    }
    setInputs({
      ...inputs,
      [e.target.name]: (e.target.value)
  })
    }


    const confirmado = (e) => {
        e.preventDefault();
        if(inputs.nombre.length > 0 && inputs.apellido.length > 0 && inputs.telefono.length === 10 && inputs.fecha.length > 0 && inputs.hora.length > 0){
        swal({
            title: `Esta por confirmar la orden nro ${orden}`,
            text: "Por favor, tome nota del numero de pedido",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Su orden ha sido confirmada!", {
                icon: "success",
              })
              .then(()=>{
                dispatch(resetearEstado())
                navigate('/')
              })
            } else {
              return
            }
          });
        } else {
            swal("Por favor, complete todos los campos", "", "error")
        }     
    }

    const  generateRandomString = () => {
        let result= Math.random().toString(36).substring(2,9);    
        setOrden(result)
    }

    useEffect(() => {
        generateRandomString();
    },[])

    const descartar= (e) => {
      e.preventDefault();
      swal({
          title: `ALERTA!`,
          text: "Si deshecha la orden, se perderá para siempre",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Su orden ha sido eliminada!", {
              icon: "success",
            })
            .then(()=>{
              dispatch(resetearEstado())
              navigate('/')
            })
          } else {
            return
          }
    }
    )
    }

    return (
        <div className="confirmcontainer">
          {total[0]?.nombre ? <div className="orden"><h1>Pedido nro: {orden}</h1> <h3>Revise que todo esté en orden</h3></div>: <h1></h1>}
            <div>
            {total.length?
            <div className="tabla">
                <table>
                    <tr><td>ITEM</td><td>PRECIO X UNIDAD</td><td>CANTIDAD</td><td>PRECIO TOTAL</td></tr>
                 {total.map((e)=><tr><td>{e.nombre}</td><td>${e.precioUnitario}</td><td>{e.cantidad}</td><td className="price">${e.precio}</td></tr>)}
                </table> <h2>El total de su compra es: ${precioFinal}</h2></div>:<h1>No ha agregado nada al carrito</h1>}
            </div>
            <div className="ordenButtons">
            <Link className="descartar" to="/" >Editar orden</Link>
            <label className="continuar" htmlFor="confcheck">Continuar compra</label>
            </div>

            <div>
                <input type="checkbox" className="confcheck" id="confcheck"></input>
                {/* <div className="capa"> */}
                <form className="formulario" onSubmit={confirmado}>
                    <label>Nombre:
                    <input onChange={controlarInputs} value={inputs.nombre} type="text" name="nombre" id= "nombre" placeholder="Nombre"/>
                    </label>
                    <label>Apellido:
                    <input onChange={controlarInputs} value={inputs.apellido} type="text" name="apellido" id="apellido" placeholder="Apellido"/>
                    </label>
                    <label>Nro de telefono:
                    <input onChange={controlarInputs} value={inputs.telefono} type="text" name="telefono" id="telefono" placeholder="Telefono" pattern="[0-9]{0,10}"/>
                    </label>
                    <label>Dia y Hora de retiro:
                      <div className="horario">
                    <input onChange={controlarInputs} value={inputs.fecha} type="date" max={maxCondition()}min={minCondition()} name="fecha" id="fecha" placeholder="Dia y Hora de retiro"/>
                    <input onChange={verificarHora} value={inputs.hora} type="time"  min={inputs.fecha===minCondition()? horaCondition() : "08:00" } max="20:00"name="hora" id="hora" placeholder="Hora de retiro"/>
                    </div>
                    </label>
                    <div className="botones">
                    <button onClick={descartar} >Descartar</button>
                    <button type="submit" >Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}