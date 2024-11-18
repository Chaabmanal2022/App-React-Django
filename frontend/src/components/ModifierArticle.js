import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ModifierArticle.css";

const ModifierArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    nom: "",
    description: "",
    prix: "",
    image: null,
    categorie: "",
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement de l'article.");
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data);
        setImagePreview(`http://localhost:8000${data.image}`);
      })
      .catch((error) => setError(error.message));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:8000/api/categories/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des catégories.");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setArticle({ ...article, image: file });

    // Générer un aperçu de l'image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", article.nom);
    formData.append("prix", article.prix);
    formData.append("description", article.description);

    if (article.image) {
      formData.append("image", article.image);
    }

    fetch(`http://localhost:8000/api/articles/update/${id}/`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour de l'article.");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Article modifié avec succès !");
        setTimeout(() => {
          navigate(`/category/${article.categorie}`);
        }, 3000);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="modifier-article-container">
      <h2>Modifier un Article</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="modifier-article-form">
        <label>
          Nom :
          <input
            type="text"
            name="nom"
            value={article.nom}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Description :
          <textarea
            name="description"
            value={article.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Prix (en DH) :
          <input
            type="number"
            name="prix"
            value={article.prix}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Image actuelle :
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Aperçu de l'image"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          ) : (
            <p>Aucune image disponible</p>
          )}
        </label>

        <label>
          Modifier l'image :
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>

        <label>
          Catégorie :
          <select
            name="categorie"
            value={article.categorie}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Sélectionnez une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="submit-button">
          Appliquer les changements
        </button>

        <a
          href="#"
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
            display: "inline-block",
            color: "black",
            textDecoration: "none",
            fontSize: "16px",
            textAlign: "center",
            transition: "font-weight 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.fontWeight = "bold";
            e.target.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.target.style.fontWeight = "normal";
          }}
        >
          Retourner à la liste des articles
        </a>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ModifierArticle;
