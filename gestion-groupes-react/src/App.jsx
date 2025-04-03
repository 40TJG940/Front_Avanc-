import { useState, useCallback } from 'react';
import Groups from './components/Groups.jsx';
import CreateNewGroup from './components/CreateNewGroup.jsx';
import './styles/styles.scss';

function App() {
  // État pour stocker tous les groupes avec leur numéro persistant
  const [allGroups, setAllGroups] = useState([]);
  const [nextGroupId, setNextGroupId] = useState(1);
  // État pour le filtrage des groupes complets
  const [showOnlyCompleteGroups, setShowOnlyCompleteGroups] = useState(false);

  // Fonction pour ajouter un nouveau groupe
  const handleCreateGroup = (membersGroup) => {
    if (membersGroup.length > 0) {
      // Ajouter le groupe avec un ID unique persistant
      setAllGroups(prevGroups => [...prevGroups, { 
        id: nextGroupId, 
        members: membersGroup 
      }]);
      // Incrémenter l'ID pour le prochain groupe
      setNextGroupId(prevId => prevId + 1);
    }
  };

  // Fonction pour supprimer un groupe
  const handleDeleteGroup = (groupId) => {
    setAllGroups(prevGroups => 
      prevGroups.filter(group => group.id !== groupId)
    );
  };

  // Fonction pour ajouter un membre à un groupe existant
  const handleAddMemberToGroup = (newMember, groupId) => {
    if (newMember.trim() !== "") {
      setAllGroups(prevGroups => 
        prevGroups.map(group => 
          group.id === groupId 
            ? { ...group, members: [...group.members, newMember] } 
            : group
        )
      );
    }
  };

  // Filtrer les groupes selon l'option sélectionnée
  const filteredGroups = showOnlyCompleteGroups 
    ? allGroups.filter(group => group.members.length >= 5) 
    : allGroups;

  return (
    <div className="container">
      <div className="app-layout">
        {/* Panneau de gauche : Création de groupe */}
        <section className="create-panel">
          <h2>Créer votre groupe</h2>
          <CreateNewGroup handleCreateGroup={handleCreateGroup} />
        </section>
        
        {/* Panneau de droite : Affichage des groupes */}
        <section className="groups-panel">
          <Groups 
            groups={filteredGroups} 
            handleDeleteGroup={handleDeleteGroup}
            handleAddMemberToGroup={handleAddMemberToGroup}
          />
          
          {/* Options supplémentaires */}
          <div className="groups-options">
            <div className="option-row">
              <label>Afficher les groupes complets</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={showOnlyCompleteGroups}
                  onChange={(e) => setShowOnlyCompleteGroups(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <button 
              className="reset-button" 
              onClick={() => {
                setAllGroups([]);
                setNextGroupId(1);
              }}
            >
              Réinitialiser les groupes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
