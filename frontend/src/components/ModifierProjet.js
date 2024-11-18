import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModifierProjet = () => {
  const { id } = useParams(); // Récupérer l'ID du projet à modifier
  const [projet, setProjet] = useState({ nom: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjet = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projets/${id}/`);
        setProjet(response.data); // Met à jour l'état avec les données du projet
      } catch (error) {
        toast.error("Erreur lors de la récupération du projet.");
      }
    };

    fetchProjet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjet({ ...projet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/projets/${id}/`, projet);
      toast.success("Projet modifié avec succès !");
      setTimeout(() => {
        navigate('/'); // Redirige vers la liste des projets après un court délai
      }, 2000); // Optionnel : délai pour laisser le message s'afficher
    } catch (error) {
      toast.error("Erreur lors de la modification du projet.");
    }
  };

  return (
    <div>
      <h1>Modifier le Projet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={projet.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={projet.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sauvegarder les modifications</button>
      </form>
      <ToastContainer /> {/* Affiche les notifications toast */}
    </div>
  );
};

export default ModifierProjet;
