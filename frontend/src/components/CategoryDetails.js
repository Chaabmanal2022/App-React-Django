import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CategoryDetails.css';


const CategoryDetails = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/categorie/${id}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Une erreur s'est produite lors du chargement des articles");
        }
        return response.json();
      })
      .then(data => {
        setArticles(data);
        setFilteredArticles(data); // Initialiser les articles filtrés
      })
      .catch(error => setError(error.message));
  }, [id]);

  useEffect(() => {
    // Fonction pour normaliser une chaîne en supprimant les accents
    const normalizeString = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    const results = articles.filter(article =>
      normalizeString(article.nom).includes(normalizeString(searchTerm)) || // Filtrer par nom sans accents
      normalizeString(article.description).includes(normalizeString(searchTerm)) // Filtrer par description sans accents
    );
    setFilteredArticles(results);
  }, [searchTerm, articles]);

  const handleDeleteArticle = (articleId) => {
    fetch(`http://localhost:8000/api/articles/delete/${articleId}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'article");
        }
        setArticles(articles.filter(article => article.id !== articleId));
        toast.success("L'article a été supprimé avec succès !");
      })
      .catch(error => setError(error.message));
  };

  const handleAddArticleClick = () => {
    navigate('/ajouter-article');
  };

    const handleEditArticle = (id) => {
    navigate(`/modifier-article/${id}`); // Redirection vers ModifierArticle avec l'ID
  };

  return (
    <div className="category-details-container"
    >
      <h2>Sélection d'Articles à Ne Pas Manquer</h2>

{/* Barre de recherche */}
<div className="search-container">
  <input
    type="text"
    placeholder="Rechercher un article ..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-bar"
  />
  <span className="search-icon">🔍</span> {/* Icône de recherche à la fin */}
</div>
      <button onClick={handleAddArticleClick} className="add-article-button">
        Ajouter un article
      </button>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="article-grid">
          {filteredArticles.length === 0 ? (
            <p className="no-articles">Aucun article trouvé pour cette catégorie.</p>
          ) : (
            filteredArticles.map((article) => (
              <div key={article.id} className="article-item">
                <div className="article-header">
                  <h3>{article.nom}</h3>
                  <p>{article.prix} DH</p>
<div className="button-group">
<button
  className="edit-button"
  onClick={() => handleEditArticle(article.id)}
>
  ✏️
</button>

  <button
    className="delete-button"
    onClick={() => handleDeleteArticle(article.id)}
  >
    🗑
  </button>
</div>


                </div>
                <p>{article.description}</p>
                {article.image && (
                  <img
                    src={`http://localhost:8000${article.image}`}
                    alt={article.nom}
                    className="article-image"
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CategoryDetails;
