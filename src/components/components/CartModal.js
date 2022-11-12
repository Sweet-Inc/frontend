import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector } from 'react-redux';

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
    display: 'relative',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1rem',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  body: {
    display: 'relative',
    width: 800,
    height: '65vh',
    overflow: 'auto',
    marginBottom: '3rem',
  },
  footer: {
    padding: theme.spacing(2, 4, 3),
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    marginBottom: '0.75rem',
  },
}));

export default function CartModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.data);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title">Your cart:</h3>
      <div className={classes.body}>
        <ul className="activity-list">
          {cartItems &&
            cartItems.map((item) => (
              <li className="act_follow">
                <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                <div className="act_list_text">
                  <h4>Monica Lucas</h4>
                  started following <span className="color">Gayle Hicks</span>
                  <span className="act_list_date">10/07/2021, 12:40</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className={classes.footer}>
        <span
          onClick={() => window.open('/#', '_self')}
          className="btn-main lead"
        >
          Process
        </span>
      </div>
    </div>
  );

  return (
    <>
      <span
        style={{
          width: '100px',
          marginLeft: '100px',
        }}
      >
        <span className="btn-main lead" onClick={handleOpen}>
          <i className="fa fa-shopping-cart fa-lg"></i>
          <span style={{ marginLeft: '0.5rem', color: '#fff' }}>
            ({cartItems.length})
          </span>
        </span>
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
