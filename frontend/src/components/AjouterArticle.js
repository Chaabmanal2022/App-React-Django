import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './AjouterArticle.css';

const AjouterArticle = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(null);
  const [categorie, setCategorie] = useState(1); // ID de la catégorie par défaut
  const navigate = useNavigate();

  const notifySuccess = () => {
    toast.success("Article créé avec succès !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('image', image);
    formData.append('categorie', categorie);

    try {
      const response = await fetch('http://localhost:8000/api/articles/create/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Article créé avec succès:', data);
        notifySuccess();

        setNom('');
        setDescription('');
        setPrix('');
        setImage(null);
        setCategorie(1);

        setTimeout(() => {
          navigate(`/category/${categorie}`);
        }, 3000);
      } else {
        console.error('Erreur lors de la création de l\'article:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur de réseau:', error);
    }
  };

  return (
    <div className="page-container"
    >
      <div className="ajouter-article-container"
      >
        <h2>Ajouter un Nouvel Article</h2>
        <form onSubmit={handleSubmit} className="ajouter-article-form">
          <label>
            Nom de l'article:
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Prix:
            <input
              type="number"
              step="0.01"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
            />
          </label>

          <label>
            Image:
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </label>

          {/* Champ caché pour Catégorie */}
          <input
            type="hidden"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          />

          <button type="submit" className="submit-button"
            style={{
    backgroundColor: '#bc405a',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  }}
          >Ajouter</button>
<a
  href="#"
  onClick={() => navigate(-1)}
  style={{
    marginTop: '20px',
    display: 'inline-block',
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
    textAlign: 'center',
    transition: 'font-weight 0.3s',
  }}
  onMouseEnter={(e) => {
    e.target.style.fontWeight = 'bold';
    e.target.style.textDecoration = 'underline';
  }}
  onMouseLeave={(e) => {
    e.target.style.fontWeight = 'normal';
  }}
>
  Retourner à la liste des articles
</a>

        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AjouterArticle;
