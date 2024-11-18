// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Categories from './components/Categories';
import AddProject from './components/AddProject';
import ModifierProjet from './components/ModifierProjet';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CategoryDetails from './components/CategoryDetails';
import AjouterArticle from './components/AjouterArticle';
import AjouterCategorie from './components/AjouterCategorie';
import ModifierArticle from './components/ModifierArticle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/ajouter-projet" element={<AddProject />} />
        <Route path="/modifier-projet/:id" element={<ModifierProjet />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/categories" element={<Categories />} /> {/* Ajout de la route */}
        <Route path="/category/:id" element={<CategoryDetails />} /> {/* Route pour CategoryDetails */}
        <Route path="/ajouter-article" element={<AjouterArticle />} />
        <Route path="/ajouter-categorie" element={<AjouterCategorie />} />
        <Route path="/modifier-article/:id" element={<ModifierArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
