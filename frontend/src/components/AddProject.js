// src/components/AddProjet.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProjet = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      await axios.post('http://localhost:8000/api/projets/', { nom, description });
      // Afficher une notification de succès
      toast.success('Projet ajouté avec succès !');
      setNom('');
      setDescription('');
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
      // Afficher une notification d'erreur
      toast.error('Erreur lors de l\'ajout du projet. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h1>Ajouter un Projet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter Projet</button>
      </form>
      {/* Conteneur pour les notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddProjet;
