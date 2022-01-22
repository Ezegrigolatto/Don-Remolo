import {Link} from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import Carrito from "../carrito/carrito";
import "./nav.css";

export default function Nav () {
    return (
        <div className="homeContainer">
            <img src={Logo} alt="logo" className="logo"></img>
            <span className="titulo">
            <h1>Pizzeria Don Rémolo</h1>
            <h3>Tu mejor elección, siempre...</h3>
            </span>
            <span className="datos">
            <p>Tel:+54 5555 5555</p>
            <p>Dir: Lorem Ipsum 4685</p>
            </span>
            <Carrito/>
        </div>
    );
}