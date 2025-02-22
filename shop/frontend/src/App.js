import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUsPage from './Pages/AboutUsPage';
import ContactsPage from './Pages/ContactsPage';
import PersonalPage from './Pages/PersonalPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/personal" element={<PersonalPage />} />
        </Routes>
        
    );
}

export default App;
