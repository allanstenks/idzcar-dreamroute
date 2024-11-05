import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// CSS
import "./App.scss";

// Pages IDZ Car
import Home from './pages/Home';
import Busca from './pages/Busca';
import Veiculos from './pages/Veiculos';
import Detalhes from './pages/Detalhes';
import Sobre from './pages/Sobre';
import Blindagem from './pages/Blindagem';
import CotacaoBlindagem from './pages/CotacaoBlindagem';
import OrcamentoBlindagem from './pages/CotacaoBlindagem/Orcamento';
import Funilaria from './pages/Funilaria';
import Estetica from './pages/Estetica';
import CotacaoEstetica from './pages/CotacaoEstetica';
import OrcamentoEstetica from './pages/CotacaoEstetica/Orcamento';
import FaleConosco from './pages/FaleConosco';
import VendaSeuCarro from './pages/VendaSeuCarro';
import Institucional from './pages/Institucional';
import Page404 from './pages/Page404';
import Importacao from './pages/Importacao';

import Hotjar from '@hotjar/browser';



// styles
import './App.scss';
import { NavigationProvider } from './context/useNavigation.js';
import { SearchProvider } from './context/useSearch.js';

const siteId = 4977592;
const hotjarVersion = 6;
Hotjar.init(siteId, hotjarVersion);

function App() {
  return (
    <Router>
      <NavigationProvider>
        <SearchProvider>
          <AppRoutes />
        </SearchProvider>
      </NavigationProvider>
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const initializeAnalytics = () => {
      if (window.gtag) {
        window.gtag('config', 'AW-386424868', {
          page_path: location.pathname,
        });
      }
    };

    initializeAnalytics();
  }, [location]);

  return (
    <Routes>
      {/* START ROTAS NÃO AUTENTICADAS */}
      <Route exact path="/" element={<Home />} />
      <Route exact path="/busca" element={<Busca />} />
      <Route path='/busca/:listagem' element={<Busca />} />
      <Route path='/busca/:listagem/:condicao' element={<Busca />} />
      <Route path='/busca/:listagem/:condicao/:marca' element={<Busca />} />
      <Route path='/busca/:listagem/:condicao/:marca/:modelo' element={<Busca />} />
      <Route exact path="/veiculos" element={<Veiculos />} />
      <Route exact path="/detalhe/:url" element={<Detalhes />} />
      <Route exact path="/sobre" element={<Sobre />} />
      <Route exact path="/blindagem" element={<Blindagem />} />
      <Route exact path="/blindagem/cotacao" element={<CotacaoBlindagem />} />
      <Route exact path="/blindagem/orcamento/:pedido" element={<OrcamentoBlindagem />} />
      <Route exact path="/funilaria" element={<Funilaria />} />
      <Route exact path="/estetica" element={<Estetica />} />
      <Route exact path="/estetica/cotacao" element={<CotacaoEstetica />} />
      <Route exact path="/estetica/orcamento/:pedido" element={<OrcamentoEstetica />} />
      <Route exact path="/faleconosco" element={<FaleConosco />} />
      <Route exact path="/vendaseucarro" element={<VendaSeuCarro />} />
      <Route exact path="/institucional" element={<Institucional />} />
      <Route exact path="/institucional/:url" element={<Institucional />} />
      <Route exact path="/importacao/" element={<Importacao />} />
      <Route path="/*" element={<Page404 />} />
      {/* END NOT FOUND*/}
    </Routes>
  );
}

export default App;
