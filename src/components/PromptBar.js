import { React, useState } from 'react';
import { Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { generateTwoLayers } from '../api/apiCalls.js';
import "../App.css"

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
  const [loading, setLoading] = useState(false);
  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      // generateTwoLayers(event.target.value);
      const temp = await generateTwoLayers(event.target.value);
      setLoading(false);
      console.log(temp);
    }
  };


  return (
    loading ?
        <div  class="lds-roller background"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    
      :
      <Modal open={true} onClose={onClose}>
        <div className={classes.paper} style={{ borderRadius: "6px" }}>
          <TextField fullWidth placeholder="I want to become an expert in..." autoFocus onKeyDown={handleSearch} />
        </div>
      </Modal>
  );
};

export default PromptBar;
