import { memo } from 'react';
import Group from './Group.jsx';
import classes from '../styles/groups.module.css';
import { motion, AnimatePresence } from 'framer-motion'; // Utilisons AnimatePresence pour une meilleure animation

const Groups = ({ groups, handleDeleteGroup, handleAddMemberToGroup }) => {
  // Si aucun groupe n'existe encore
  if (groups.length === 0) {
    return (
      <div className={classes.emptyGroups}>
        <p>Aucun groupe n'a été créé pour le moment.</p>
        <p>Utilisez le formulaire à gauche pour créer votre premier groupe.</p>
      </div>
    );
  }

  return (
    <motion.div className={classes.groups}>
      <div className={classes.groupsGrid}>
        <AnimatePresence>
          {groups.map((group) => (
            <motion.div
              key={`group-${group.id}`}
              className={classes.groupCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <Group 
                groupNumber={`G${group.id}`}
                groupListMember={group.members} 
                onDelete={() => handleDeleteGroup(group.id)}
                onAddMember={(member) => handleAddMemberToGroup(member, group.id)}
                memberCount={group.members.length}
                isComplete={group.members.length >= 5}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Optimisation avec memo pour éviter les rendus inutiles
export default memo(Groups);