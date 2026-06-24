import { useState, useEffect } from "react";
import { MERCADOS } from "./data/needs";
import { notifications as initialNotifications, faqItems, initialNeeds, campaignGoal } from "./data/mockData";
import { PhoneFrame } from "./components/PhoneFrame";
import { Toast } from "./components/Toast";
import { Buscar } from "./screens/Buscar";
import { EscolherItem } from "./screens/EscolherItem";
import { Fornecedores } from "./screens/Fornecedores";
import { Pagamento } from "./screens/Pagamento";
import { Confirmacao } from "./screens/Confirmacao";
import { Perfil } from "./screens/Perfil";
import PartnerDashboard from "./screens/PartnerDashboard";
import { MeuEstabelecimento } from "./screens/MeuEstabelecimento";
import { PartnerHistory } from "./screens/PartnerHistory";
import PartnerOrderDetail from "./screens/PartnerOrderDetail";
import SettingsScreen from "./screens/SettingsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import HelpScreen from "./screens/HelpScreen";
import ManageDataScreen from "./screens/ManageDataScreen";
import ManagementScreen from "./screens/ManagementScreen";
import { PartnerSettings } from "./screens/PartnerSettings";

export default function App() {
  const [screen, setScreen] = useState("buscar");
  const [market, setMarket] = useState(MERCADOS[0]);
  const [ong, setOng] = useState("ONG Esperança");
  const [cart, setCart] = useState([]);
  const [preItem, setPreItem] = useState(null);
  const [toast, setToast] = useState(null);

  // NOVO: Estado para guardar o pedido clicado
  const [partnerOrderId, setPartnerOrderId] = useState(1042);

  const [settings, setSettings] = useState({
    colorBlindMode: false,
    urgentCampaigns: true,
    donationStatus: false,
  });
  const [anonymousDonations, setAnonymousDonations] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [needs] = useState(initialNeeds);
  const [prevScreen, setPrevScreen] = useState("buscar");

  const go = (target) => {
    setPrevScreen(screen);
    setScreen(target);
  };

  const showToast = (m) => setToast(m);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(id);
  }, [toast]);

  const iniciarDoacao = (o, it) => { setOng(o); setPreItem(it); go("a4"); };
  const handleToggleSetting = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));
  const handleMarkAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // NOVO: Função para navegar para o pedido correto
  const abrirPedidoParceiro = (id) => {
    setPartnerOrderId(id);
    go("partnerOrder");
  };

  const telas = {
    buscar: <Buscar go={go} showToast={showToast} iniciarDoacao={iniciarDoacao} />,
    a4: <EscolherItem ong={ong} initialItem={preItem} setCart={setCart} go={go} />,
    a5: <Fornecedores go={go} setMarket={setMarket} ong={ong} />,
    a6: <Pagamento go={go} market={market} ong={ong} cart={cart} showToast={showToast} />,
    a7: <Confirmacao go={go} ong={ong} />,
    a8: <Perfil go={go} showToast={showToast} />,
    a9: (
        <SettingsScreen
            settings={settings}
            onToggle={handleToggleSetting}
            onNavigateNotifications={() => go("a10")}
            onNavigateData={() => go("manageData")}
            onBack={() => go("a8")}
            go={go}
            showToast={showToast}
        />
    ),
    a10: (
        <NotificationsScreen
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onNavigateHelp={() => go("a11")}
            onBack={() => go("a9")}
            colorBlindMode={settings.colorBlindMode}
            go={go}
            showToast={showToast}
        />
    ),
    a11: <HelpScreen faqItems={faqItems} onBack={() => go(prevScreen)} showToast={showToast} />,
    manageData: (
        <ManageDataScreen
            anonymousDonations={anonymousDonations}
            onToggleAnonymous={setAnonymousDonations}
            onBack={() => go("a9")}
            showToast={showToast}
        />
    ),
    management: (
        <ManagementScreen
            goal={campaignGoal}
            needs={needs}
            onAddItem={() => showToast("Em breve")}
            onBack={() => go("a8")}
        />
    ),
    partnerHome: <PartnerDashboard go={go} showToast={showToast} abrirPedido={abrirPedidoParceiro} />,
    partnerHistory: <PartnerHistory go={go} showToast={showToast} abrirPedido={abrirPedidoParceiro} />,
    partnerStore: <MeuEstabelecimento go={go} showToast={showToast} />,
    partnerSettings: <PartnerSettings go={go} showToast={showToast} settings={settings} onToggle={handleToggleSetting} />,
    partnerOrder: <PartnerOrderDetail key={`order-${partnerOrderId}`} go={go} showToast={showToast} orderId={partnerOrderId} />,
  };
  return (
      <PhoneFrame>
        {/* Filtro Matemático de Deuteranopia */}
        <svg style={{ width: 0, height: 0, position: "absolute" }}>
          <defs>
            <filter id="deuteranopia">
              <feColorMatrix
                  type="matrix"
                  values="0.367  0.861 -0.228  0.000  0.000
                      0.280  0.673  0.047  0.000  0.000
                     -0.012  0.043  0.969  0.000  0.000
                      0.000  0.000  0.000  1.000  0.000"
              />
            </filter>
          </defs>
        </svg>

        <div
            key={screen}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              animation: "gvIn .22s ease",
              // O filtro é ativado aqui dinamicamente:
              filter: settings.colorBlindMode ? "url(#deuteranopia)" : "none",
              transition: "filter 0.3s ease" // Transição suave ao ligar/desligar
            }}
        >
          {telas[screen]}
        </div>
        <Toast message={toast} />
      </PhoneFrame>
  );
}