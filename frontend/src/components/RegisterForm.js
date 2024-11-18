import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import './RegisterForm.css';
import backgroundImage from '../assets/background.jpg';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordSuggestions, setPasswordSuggestions] = useState([]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Utilisation de zxcvbn pour analyser la force du mot de passe
        const result = zxcvbn(newPassword);
        setPasswordStrength(result.score); // Score de force (0 à 4)
        setPasswordSuggestions(result.feedback.suggestions); // Suggestions pour améliorer la sécurité
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        const response = await fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            setMessage("Votre inscription a été réalisée avec succès !");
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setMessage("Une erreur s'est produite.");
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return 'red';
            case 1: return 'orange';
            case 2: return 'yellow';
            case 3: return 'lightgreen';
            case 4: return 'green';
            default: return 'grey';
        }
    };

    const getCustomMessage = (score) => {
        switch (score) {
            case 0:
                return "Mot de passe très faible. Essayez d'ajouter des lettres, des chiffres et des symboles.";
            case 1:
                return "Mot de passe faible. Rendez-le plus fort en ajoutant des caractères variés.";
            case 2:
                return "Mot de passe moyen. Vous pouvez encore l'améliorer.";
            case 3:
                return "Bon mot de passe. Ajoutez quelques caractères pour le rendre encore meilleur.";
            case 4:
                return "Mot de passe fort. Vous êtes prêt !";
            default:
                return "";
        }
    };

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '70vh',
            }}
        >
            <form onSubmit={handleRegister} className="register-form">
                <h2 className="register-title">Rejoignez la communauté de Féminité Chérie</h2>
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
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
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
                    <div
                        className="password-strength-bar"
                        style={{
                            height: '5px',
                            width: '100%',
                            backgroundColor: getStrengthColor(),
                            marginTop: '5px',
                        }}
                    ></div>
                    <p
                        className="password-strength-message"
                        style={{ color: getStrengthColor() }}
                    >
                        {getCustomMessage(passwordStrength)}
                    </p>

                </div>
                <div className="input-group">
                    <label className="label">Confirmer le mot de passe:</label>
                    <div className="password-wrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input"
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? '🔒' : '👁️‍🗨️'}
                        </span>
                    </div>
                </div>
                <button type="submit" className="button">S'inscrire</button>
                {message && <p className="message">{message}</p>}

                <p className="login-link">
                    Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link>.
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
