import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
}));

export default function EditModal({ box, handleEditBox }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [boxData, setBoxData] = React.useState(box);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setBoxData({
      ...boxData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEditBox({
      ...boxData,
      id: Number(boxData.id) || 0,
      quantity: Number(boxData.quantity) || 0,
      lowerAge: Number(boxData.lowerAge) || 0,
      upperAge: Number(boxData.upperAge) || 0,
      boxPatternId: Number(boxData.boxPatternId) || 0,
    });
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit</h2>
      <div className={classes.container}>
        <TextField
          disabled
          name="id"
          id="id"
          label="ID:"
          defaultValue={box.id}
        />
        <TextField
          id="lowerAge"
          name="lowerAge"
          label="From age:"
          type="number"
          defaultValue={box.lowerAge}
          onChange={handleChangeValue}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="upperAge"
          name="upperAge"
          label="To age:"
          type="number"
          defaultValue={box.upperAge}
          onChange={handleChangeValue}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          defaultValue={box.quantity}
          onChange={handleChangeValue}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Save
      </Button>
      <Modal />
    </div>
  );

  return (
    <span>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </span>
  );
}
