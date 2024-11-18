import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AjouterCategorie = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const notifySuccess = () => {
    toast.success("Catégorie créé avec succès !", {
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
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/api/categories/create/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Catégorie créé avec succès:', data);
        notifySuccess();

        setNom('');
        setDescription('');
        setImage(null);

        setTimeout(() => {
          navigate(`/categories`);
        }, 3000);
      } else {
        console.error('Erreur lors de la création de la Catégorie:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur de réseau:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="ajouter-article-container">
        <h2>Ajouter une nouvelle Catégorie</h2>
        <form onSubmit={handleSubmit} className="ajouter-article-form">
          <label>
            Nom de la Catégorie:
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
            Image:
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </label>

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
  Retourner à la liste des Categories
</a>


        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AjouterCategorie;
