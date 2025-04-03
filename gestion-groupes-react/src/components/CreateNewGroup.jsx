import { useState, useRef } from 'react';
import Group from './Group.jsx';
import classes from '../styles/createNewGroup.module.css';

const CreateNewGroup = ({ handleCreateGroup }) => {
  // États pour gérer le formulaire
  const [newMember, setNewMember] = useState('');
  const [membersGroup, setMembersGroup] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Référence pour l'animation du message d'erreur
  const errorContainer = useRef();

  // Ajouter un membre au groupe temporaire
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Vérification du champ vide
    if (newMember.trim() === '') {
      // Afficher le message d'erreur avec animation
      errorContainer.current.style.maxHeight = '60px';
      setErrorMessage('Aucun membre à créer, le champ est vide');
      return;
    }
    
    // Ajouter le membre et réinitialiser le champ
    setMembersGroup(prevMembers => [...prevMembers, newMember.trim()]);
    setNewMember('');
    
    // Cacher le message d'erreur s'il était visible
    errorContainer.current.style.maxHeight = '0px';
    setErrorMessage(null);
  };

  // Création du groupe final et réinitialisation
  const handleCreateFinalGroup = () => {
    if (membersGroup.length === 0) {
      // Afficher un message d'erreur si aucun membre n'a été ajouté
      errorContainer.current.style.maxHeight = '60px';
      setErrorMessage('Ajoutez au moins un membre au groupe.');
      return;
    }
    
    // Créer le groupe
    handleCreateGroup(membersGroup);
    
    // Réinitialiser le groupe temporaire
    setMembersGroup([]);
    
    // Cacher le message d'erreur
    errorContainer.current.style.maxHeight = '0px';
    setErrorMessage(null);
  };

  // Supprimer un membre du groupe temporaire
  const handleRemoveMember = (indexToRemove) => {
    setMembersGroup(prevMembers => 
      prevMembers.filter((_, index) => index !== indexToRemove)
    );
  };

  // Fermer le message d'erreur
  const handleCloseError = () => {
    errorContainer.current.style.maxHeight = '0px';
    setTimeout(() => setErrorMessage(null), 300);
  };

  return (
    <div className={classes.createNewGroup}>
      {/* Affichage des membres temporaires */}
      <div className={classes.membersTagsContainer}>
        {membersGroup.map((member, index) => (
          <div key={index} className={classes.memberTag}>
            <span>{member}</span>
            <button 
              type="button" 
              className={classes.removeTagButton}
              onClick={() => handleRemoveMember(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Champ pour entrer un nom */}
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="Entrer un nom"
        className={classes.input}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
      
      {/* Conteneur pour le message d'erreur */}
      <div
        ref={errorContainer}
        className={classes.errorContainer}
      >
        {errorMessage && (
          <div className={classes.errorContent}>
            <span>{errorMessage}</span>
            <button 
              type="button" 
              className={classes.closeErrorButton}
              onClick={handleCloseError}
            >
              ×
            </button>
          </div>
        )}
      </div>
      
      {/* Boutons d'action */}
      <div className={classes.actionButtons}>
        <button
          type="button"
          onClick={handleSubmit}
          className={classes.addButton}
        >
          AJOUTER UN MEMBRE
        </button>
        
        <button
          type="button"
          onClick={handleCreateFinalGroup}
          className={classes.createButton}
          disabled={membersGroup.length === 0}
        >
          CRÉER UN GROUPE
        </button>
      </div>
    </div>
  );
};

export default CreateNewGroup;