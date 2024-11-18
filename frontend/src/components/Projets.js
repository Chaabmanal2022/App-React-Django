import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Importation du ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const Projets = () => {
  const [projets, setProjets] = useState([]);  // État pour stocker les projets
  const [loading, setLoading] = useState(true);  // État pour gérer le chargement
  const navigate = useNavigate(); // Initialiser useNavigate

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projets/');
        setProjets(response.data);  // Met à jour l'état avec les données reçues
        setLoading(false);  // Arrête l'indicateur de chargement
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
        setLoading(false);
      }
    };

    fetchProjets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/projets/${id}/`); // Suppression du projet par son ID
      setProjets(projets.filter(projet => projet.id !== id)); // Mise à jour de l'état pour enlever le projet supprimé
      toast.success("Projet supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
      toast.error("Erreur lors de la suppression du projet.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/modifier-projet/${id}`); // Redirection vers la page de modification
  };

  const handleAdd = () => {
    navigate('/ajouter-projet'); // Redirection vers la page d'ajout de projet
  };

  if (loading) {
    return <p>Chargement des projets...</p>;
  }

  return (
    <div>
      <h1>Liste des Projets</h1>
      <button onClick={handleAdd}>Ajouter un Projet</button> {/* Bouton Ajouter */}
      <table border="1">
        <thead>
          <tr>
            <th>Nom du Projet</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map((projet) => (
            <tr key={projet.id}>
              <td>{projet.nom}</td>
              <td>{projet.description}</td>
              <td>
                <button onClick={() => handleEdit(projet.id)}>Modifier</button> {/* Bouton Modifier */}
                <button onClick={() => handleDelete(projet.id)}>Supprimer</button> {/* Bouton Supprimer */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer /> {/* Placer ToastContainer en dehors de la boucle */}
    </div>
  );
};

export default Projets;
