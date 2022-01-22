import Comidas from "./componentes/comidas/comidas";
import Confirmacion from "./componentes/confirmacion/confirmacion"
import Nav from "./componentes/nav/nav"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Comidas/>}/>
      <Route exact path="/confirmar-pedido" element={<Confirmacion/>}/>
    </Routes>
    </div>
  );
}

export default App;
