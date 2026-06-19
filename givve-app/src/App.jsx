import { useState, useEffect } from "react";
import { MERCADOS } from "./data/needs";
import { PhoneFrame } from "./components/PhoneFrame";
import { Toast } from "./components/Toast";
import { Buscar } from "./screens/Buscar";
import { EscolherItem } from "./screens/EscolherItem";
import { Fornecedores } from "./screens/Fornecedores";
import { Pagamento } from "./screens/Pagamento";
import { Confirmacao } from "./screens/Confirmacao";
import { Perfil } from "./screens/Perfil";


export default function App() {
  const [screen, setScreen] = useState("buscar");
  const [market, setMarket] = useState(MERCADOS[0]);
  const [ong, setOng] = useState("ONG Esperança"); 
  const [cart, setCart] = useState([]);            
  const [preItem, setPreItem] = useState(null);    
  const [toast, setToast] = useState(null);

  const go = setScreen;
  const showToast = (m) => setToast(m);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(id);
  }, [toast]);

  
  const iniciarDoacao = (o, it) => { setOng(o); setPreItem(it); go("a4"); };

  const telas = {
    buscar: <Buscar go={go} showToast={showToast} iniciarDoacao={iniciarDoacao} />,
    a4: <EscolherItem ong={ong} initialItem={preItem} setCart={setCart} go={go} />,
    a5: <Fornecedores go={go} setMarket={setMarket} ong={ong} />,
    a6: <Pagamento go={go} market={market} ong={ong} cart={cart} showToast={showToast} />,
    a7: <Confirmacao go={go} ong={ong} />,
    a8: <Perfil go={go} showToast={showToast} />,
  };

  return (
    <PhoneFrame>
      <div key={screen} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, animation: "gvIn .22s ease" }}>
        {telas[screen]}
      </div>
      <Toast message={toast} />
    </PhoneFrame>
  );
}
