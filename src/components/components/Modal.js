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

export default function EditModal({ mgmtType, dataItem, handleEdit }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(dataItem);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mgmtType === 'box') {
      await handleEdit({
        ...data,
        id: Number(data.id) || 0,
        quantity: Number(data.quantity) || 0,
        lowerAge: Number(data.lowerAge) || 0,
        upperAge: Number(data.upperAge) || 0,
        boxPatternId: Number(data.boxPatternId) || 0,
      });
    } else if (mgmtType === 'brand') {
      await handleEdit({
        ...data,
        id: Number(data.id) || 0,
        name: data.name,
        originid: data.originid,
      });
    } else if (mgmtType === 'category') {
      await handleEdit({
        ...data,
        id: Number(data.id) || 0,
        name: data.name,
      });
    }
    handleClose();
  };

  const handleCorrectEditForm = () => {
    switch (mgmtType) {
      case 'box':
        return (
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Edit box with ID {data.id}</h3>
            <div className={classes.container}>
              <TextField
                disabled
                name="id"
                id="id"
                label="ID:"
                defaultValue={data.id}
              />
              <TextField
                id="lowerAge"
                name="lowerAge"
                label="From age:"
                type="number"
                defaultValue={data.lowerAge}
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
                defaultValue={data.upperAge}
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
                defaultValue={data.quantity}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="boxPatternId"
                name="boxPatternId"
                label="Pattern ID:"
                type="number"
                defaultValue={data.boxPatternId}
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

      case 'brand':
        return (
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Edit brand with ID {data.id}</h3>
            <div className={classes.container}>
              <TextField
                disabled
                name="id"
                id="id"
                label="ID:"
                defaultValue={data.id}
              />
              <TextField
                id="name"
                name="name"
                label="Name:"
                defaultValue={data.name}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="originid"
                name="originid"
                label="Origin Id:"
                type="number"
                defaultValue={data.originid}
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

      case 'category':
        return (
          <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Edit category with ID {data.id}</h3>
            <div className={classes.container}>
              <TextField
                disabled
                name="id"
                id="id"
                label="ID:"
                defaultValue={data.id}
              />
              <TextField
                id="name"
                name="name"
                label="Name:"
                defaultValue={data.name}
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

      default:
        return null;
    }
  };

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
        {handleCorrectEditForm()}
      </Modal>
    </span>
  );
}
