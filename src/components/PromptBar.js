import React from 'react';
import { Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const PromptBar = ({ onClose }) => {
  const classes = useStyles();

  return (
    <Modal open={true} onClose={onClose}>
      <div className={classes.paper}>
        <TextField fullWidth placeholder="Search..." autoFocus />
      </div>
    </Modal>
  );
};

export default PromptBar;
