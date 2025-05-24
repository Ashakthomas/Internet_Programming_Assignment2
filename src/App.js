import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Confirmation from './pages/Confirmation';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import NoCarSelected from './pages/NoCarSelected';
import Footer from './components/Footer';

function App() {
return (
<div
style={{
backgroundImage: 'url("/images/bg-sport.jpg")', 
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundAttachment: 'fixed',
minHeight: '100vh',
}}
>
<div style={{ backgroundColor: 'rgba(0,0,0,0)', minHeight: '100vh' }}>
<Router>
<Navbar />
<Toaster position="top-right" />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/reservation" element={<NoCarSelected />} />
<Route path="/reservation/:vin" element={<Reservation />} />
<Route path="/confirmation/:id" element={<Confirmation />} />
</Routes>
<Footer />
</Router>
</div>
</div>
);
}

export default App;