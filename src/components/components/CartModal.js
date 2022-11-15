import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import Swal from 'sweetalert2';

import {
  removeItem,
  addItem,
  decreaseQuantity,
  clearCart,
} from '../../features/cart/cartSlice';

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
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = async () => {
    dispatch(clearCart());
    const { isConfirmed } = await Swal.fire({
      title: 'Sucessfully!',
      text: 'Your payment is already completed!',
      icon: 'success',
      confirmButtonText: 'Cool',
    });
    if (isConfirmed) {
      navigate('/');
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {cartItems.length > 0 ? (
        <>
          <h3 id="simple-modal-title">Your cart:</h3>
          <div className={classes.body}>
            <ul className="activity-list">
              {cartItems &&
                cartItems.map((item) => (
                  <li className="act_follow" key={item.id}>
                    <div>
                      <img
                        className="lazy"
                        src={item.image}
                        alt=""
                        style={{ width: '55px', height: '55px' }}
                      />
                      <div
                        className="act_list_text"
                        style={{ paddingLeft: '75px' }}
                      >
                        <h4>{item.name}</h4>
                        <span className="color">Quantity:</span>&nbsp;&nbsp;
                        <span
                          onClick={() => dispatch(decreaseQuantity(item))}
                          style={{
                            color: '#8364e2',
                            border: '1px solid #8364e2',
                            padding: '0 0.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                        >
                          -
                        </span>
                        &nbsp;&nbsp;
                        {item.quantity}
                        &nbsp;&nbsp;
                        <span
                          onClick={() => dispatch(addItem(item))}
                          style={{
                            color: '#8364e2',
                            border: '1px solid #8364e2',
                            padding: '0 0.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <span
                      className="remove_item"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      X
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className={classes.footer}>
            <span onClick={() => handlePayment()} className="btn-main lead">
              Process
            </span>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3>Nothing in your cart. Please add some candy.</h3>
          <span onClick={handleClose} className="btn-main lead">
            Gotcha!
          </span>
        </div>
      )}
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
