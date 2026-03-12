import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Dashboard from './pages/user/Dashboard'
import { WalletProvider } from "./solana/context/WalletContext";
import { Notifications } from "./solana/context/Notifications";
import ProtectedRoute from './solana/context/ProtectedRoute';
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './components/layout/MainLayout'
import SmartContract from './pages/smartContract/SmartContract'
import AuthLayout from './components/layout/AuthLayout'
import DirectTeam from './pages/smartContract/DirectTeam'
import NetworkTeam from './pages/smartContract/NetworkTeam'
import MatrixTree from './pages/smartContract/MatrixTree'
import SponsorBonus from './pages/smartContract/SponsorBonus'
import DirectBonus from './pages/smartContract/DirectBonus'
import LevelBonus from './pages/smartContract/LevelBonus'
import PoolBonus from './pages/smartContract/PoolBonus'
import MatchingBonus from './pages/smartContract/MatchingBonus'
import GlobalPoolBonus from './pages/smartContract/GlobalPoolBonus'
import TeamTree from './pages/smartContract/TeamTree'
import Calculator from './pages/smartContract/Calculator'
import PersentationPdf from './pages/smartContract/PersentationPdf'
import WebBanners from './pages/smartContract/WebBanners'
import PromotionBanner from './pages/smartContract/PromotionBanner'
import PrintMaterials from './pages/smartContract/PrintMaterials'
import MemeRadar from './pages/user/MemeRadar'
import FiveDollar from './pages/user/FiveDollar'
import MemeKols from './pages/user/MemeKols'
import Support from './pages/user/Support'
import Profile from './pages/user/Profile'
// import RewardBoard from './pages/user/reward/RewardBoard'


function App() {


  return (
    <>
      <WalletProvider>
      <Notifications />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/:ref" element={<Register />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
              <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          {/* <Route element={<MainLayout />}> */}
            <Route path="/smartContract" element={<SmartContract />} />
            <Route path="/directTeam" element={<DirectTeam />} />
            <Route path="/networkTeam" element={<NetworkTeam />} />
            <Route path="/matrixTree" element={<MatrixTree />} />
            <Route path="/sponsorBonus" element={<SponsorBonus />} />
            <Route path="/directBonus" element={<DirectBonus />} />
            <Route path="/levelBonus" element={<LevelBonus />} />
            <Route path="/poolBonus" element={<PoolBonus />} />
            <Route path="/matchingBonus" element={<MatchingBonus />} />
            <Route path="/globalPoolBonus" element={<GlobalPoolBonus />} />
            <Route path="/teamTree" element={<TeamTree />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/persentationPdf" element={<PersentationPdf />} />
            <Route path="/webBanner" element={<WebBanners />} />
            <Route path="/promotionBanner" element={<PromotionBanner />} />
            <Route path="/printMaterials" element={<PrintMaterials />} />
            <Route path="/memecoin" element={<MemeRadar />} />
            <Route path="/fiveDollar" element={<FiveDollar />} />
            <Route path="/memeKols" element={<MemeKols />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/rewardboard" element={<RewardBoard />} /> */}
            
          </Route>
        </Routes>
      </WalletProvider>
    </>
  )
}

export default App
