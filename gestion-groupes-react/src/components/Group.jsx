import { useState, memo } from 'react';
import classes from '../styles/group.module.css';

const Group = ({ groupNumber, groupListMember, onDelete, onAddMember }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState('');

  // Nombre de membres dans le groupe
  const memberCount = groupListMember.length;

  // Gestion de la soumission pour ajouter un nouveau membre
  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (newMember.trim()) {
      onAddMember(newMember);
      setNewMember('');
      setIsAdding(false);
    }
  };

  // Gestion de l'appui sur Entrée dans le champ de texte
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddMemberSubmit(e);
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewMember('');
    }
  };

  return (
    <div className={classes.group}>
      <div className={classes.groupHeader}>
        <h3>{groupNumber}</h3>
        <button 
          className={classes.deleteButton}
          onClick={onDelete}
          title="Supprimer ce groupe"
        >
          <span role="img" aria-label="Supprimer">🗑️</span>
        </button>
      </div>

      {/* Affichage des membres du groupe en tableau 2x2 */}
      <div className={classes.memberGrid}>
        {groupListMember.map((member, index) => (
          <div key={`${groupNumber}-member-${index}`} className={classes.memberCell}>
            <span className={classes.memberName}>{member}</span>
            <span className={classes.memberNameRepeat}>{member}</span>
          </div>
        ))}
      </div>

      {/* Bouton pour ajouter un membre */}
      <div className={classes.addMemberButton} onClick={() => setIsAdding(!isAdding)}>
        <img src="/api/placeholder/20/20" alt="Ajouter" className={classes.addIcon} />
      </div>

      {/* Nombre de membres */}
      <div className={classes.memberCount}>
        {memberCount}
      </div>

      {/* Formulaire pour ajouter un membre */}
      {isAdding && (
        <form onSubmit={handleAddMemberSubmit} className={classes.addMemberForm}>
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nom du nouveau membre"
            autoFocus
            className={classes.input}
          />
        </form>
      )}
    </div>
  );
};

// Optimisation avec memo pour éviter les rendus inutiles
export default memo(Group, (prevProps, nextProps) => {
  return (
    prevProps.groupNumber === nextProps.groupNumber &&
    JSON.stringify(prevProps.groupListMember) === JSON.stringify(nextProps.groupListMember)
  );
});