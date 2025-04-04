import { useState, memo } from 'react';
import classes from '../styles/group.module.css';

const Group = ({ groupNumber, groupListMember, onDelete, onAddMember, memberCount, isComplete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState('');

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
    <div className={`${classes.group} ${isComplete ? classes.completeGroup : ''}`}>
      <div className={classes.groupHeader}>
        <h3>{groupNumber}</h3>
        <button 
          className={classes.deleteButton}
          onClick={onDelete}
          title="Supprimer ce groupe"
        >
          ×
        </button>
      </div>

      <div className={classes.groupContent}>
        {/* Affichage des membres du groupe en tableau 2x2 */}
        <div className={classes.memberGrid}>
          {groupListMember.map((member, index) => (
            <div key={`${groupNumber}-member-${index}`} className={classes.memberCell}>
              <span className={classes.memberName} title={member}>{member}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zone des boutons d'action */}
      <div className={classes.groupActions}>
        {/* Nombre de membres avec indication visuelle si complet */}
        <div className={`${classes.memberCount} ${isComplete ? classes.completeCount : ''}`}>
          {memberCount}
        </div>

        {/* Bouton pour ajouter un membre */}
        <div className={classes.addMemberButton} onClick={() => setIsAdding(!isAdding)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
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
            maxLength={20}
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
    JSON.stringify(prevProps.groupListMember) === JSON.stringify(nextProps.groupListMember) &&
    prevProps.isComplete === nextProps.isComplete
  );
});