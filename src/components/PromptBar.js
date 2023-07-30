import React, { useContext } from 'react';
import { Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NodeContext } from '../NodeContext.js';
import { generateTwoLayers } from '../api/apiCalls.js';

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
  const { setTreeData } = useContext(NodeContext);

  const classes = useStyles();

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      generateTwoLayers(event.target.value)
        .then(response => {
          console.log(response);
          
          if (response.error) {
            console.log(response.error);
          }
          // Construct a map of nodes from the response
          // const nodesMap = {};
          // for (let key in response.data) {
          //   let node = response.data[key];
          //   nodesMap[node.id] = {...node, children: []};
          // }
          // // Build the tree hierarchy
          // let root;
          // for (let key in nodesMap) {
          //   let node = nodesMap[key];
          //   if (node.parent === "-1") {
          //     root = node; // This is the root node
          //   } else {
          //     // Append this node to its parent's children array
          //     nodesMap[node.parent].children.push(node);
          //   }
          // }
          // // Now `root` is your tree in the correct format for react-d3-tree
          // console.log(root);  
          // setTreeData(root);

          onClose();
        })
        .catch(error => {
          // Handle your error here
          console.log(error);
        });
    }
  };


  return (
    <Modal open={true} onClose={onClose}>
      <div className={classes.paper}>
        <TextField fullWidth placeholder="I want to become an expert in..." autoFocus onKeyDown={handleSearch}/>
      </div>
    </Modal>
  );
};

export default PromptBar;
