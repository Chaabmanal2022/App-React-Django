import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import './Categories.css';
import backgroundImage from '../assets/background-category.jpg';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialise useNavigate

    useEffect(() => {
        fetch('http://localhost:8000/api/categories/')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Une erreur s'est produite");
                }
                return response.json();
            })
            .then(data => setCategories(data))
            .catch(error => setError(error.message));
    }, []);

    // Fonction de gestion du clic sur une catégorie
    const handleCategoryClick = (id) => {
        navigate(`/category/${id}`); // Redirige vers la page avec l'ID de la catégorie
    };

    const handleAddCategorieClick = () => {
        navigate('/ajouter-categorie');
    };

    const handleRemoveCategory = (id) => {
    fetch(`http://localhost:8000/api/categories/${id}/delete/`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de la catégorie");
        }
        // Met à jour l'état local pour retirer la catégorie supprimée
        setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
    })
    .catch(error => setError(error.message));
};



    return (
        <div className="categories-container"
                    style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'auto 100%', // Largeur augmentée
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <h2>Nos Accessoires Coup de Coeur</h2>
            <button onClick={handleAddCategorieClick} className="add-categorie-button">Ajouter Categorie</button>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul className="category-list">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="category-item"
                            onClick={() => handleCategoryClick(category.id)}
                        >
<button
    className="remove-category-button"
    onClick={(e) => {
        e.stopPropagation(); // Empêche le clic de se propager à l'élément parent
        handleRemoveCategory(category.id);
    }}
>
    X
</button>

                            {category.image && (
                                <img
                                    src={`http://localhost:8000${category.image}`}
                                    alt={category.nom}
                                    className="category-image"
                                />
                            )}
                            <div className="category-content">
                                <h3>{category.nom}</h3>
                                <p>{category.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Categories;
