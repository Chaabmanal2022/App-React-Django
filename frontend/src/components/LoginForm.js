import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import du hook useNavigate et Link
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginForm.css';  // Import du fichier CSS
import backgroundImage from '../assets/background.jpg';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
    const navigate = useNavigate(); // Initialisation de navigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Connexion réussie !");
                navigate('/categories'); // Redirection vers la page Categories
            } else {
                toast.error(data.error || "Une erreur s'est produite.");
            }
        } catch (error) {
            toast.error("Erreur de connexion. Veuillez réessayer.");
        }
    };

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover', // L'image couvre tout le conteneur
                backgroundPosition: 'center', // Centre l'image
                backgroundRepeat: 'no-repeat', // Évite la répétition de l'image
                width: '100%', // Largeur totale du conteneur
                height: '70vh', // Hauteur égale à la hauteur de la fenêtre
            }}
        >
            <form onSubmit={handleLogin} className="login-form">
                <h2 className="login-title">Rejoindre Féminité Chérie</h2>
                <div className="input-group">
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Mot de passe:</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'} // Change le type en fonction de l'état
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🔒' : '👁️‍🗨️'}
                        </span>
                    </div>
                </div>
                <button type="submit" className="button">Se connecter</button>

                {/* Lien vers l'inscription */}
                <p className="signup-link">
                    Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous ici</Link> .
                </p>
            </form>

            {/* Conteneur Toastify */}
            <ToastContainer />
        </div>
    );
};

export default LoginForm;
