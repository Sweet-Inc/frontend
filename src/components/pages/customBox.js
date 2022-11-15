import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import useFetch from '../../hook/GetFetch';
import { transformBoxDataToBeUnique } from '../../utils/transformBoxUnique';
import Swal from 'sweetalert2';
import { navigate } from '@reach/router';
import { getUser } from '../../firebase/data/currentUser';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const CustomBox = function () {
  const {
    data: boxes,
    isPending,
    error,
  } = useFetch('https://sweetincmgmtapi.azurewebsites.net/api/Boxes/GetAll');

  const [state, setState] = useState(null);
  const [data, setData] = useState(null);
  const { res } = getUser();
  useEffect(() => {
    if (!res) {
      navigate('/', { replace: true });
    }
    handleChangePrice();
  }, [state]);

  const handleChangePrice = async () => {
    if (!state) return;
    const response = await fetch(
      `https://sweetincmgmtapi.azurewebsites.net/api/BoxProducts/AddRandomProducts/${state}`,
      {
        method: 'PUT',
      }
    ).then((res) => res.json());
    setData(response);
  };

  const handleChoosePrice = (id) => {
    setState(id);
  };

  const handlePayment = async () => {
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

  const handleResetPrice = () => {
    setState(null);
    setData(null);
  };

  const handleCalculateTotal = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].quantity * data[i].product.price;
    }
    return total;
  };

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Create candy box on your own!</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-4">
            <span className="filter__l">Price that suitable for you:</span>
            <span className="filter__r" onClick={handleResetPrice}>
              Reset
            </span>
            <div className="spacer-half"></div>
            <div className="clearfix"></div>
            <ul className="activity-filter">
              {boxes &&
                transformBoxDataToBeUnique(boxes).map((item) => (
                  <li
                    id="itemBoxPattern"
                    className={`filter_by_sales ${
                      state === item.id ? 'active' : ''
                    }`}
                    onClick={() => handleChoosePrice(item.id)}
                  >
                    <i className="fa fa-shopping-basket"></i>
                    {item.boxPattern.price}
                  </li>
                ))}
            </ul>
          </div>
          {data && (
            <div className="col-md-8">
              <ul className="activity-list">
                {data.map((item) => (
                  <li className="act_follow" key={item.id}>
                    <div>
                      <img
                        className="lazy"
                        src={item.product.image}
                        alt=""
                        style={{ width: '55px', height: '55px' }}
                      />
                      <div
                        className="act_list_text"
                        style={{ paddingLeft: '75px' }}
                      >
                        <h4>{item.product.name}</h4>
                        <div>
                          <span className="color">Quantity:</span>&nbsp;&nbsp;
                          {item.quantity}
                        </div>
                        <span className="color">Price pcs:</span>&nbsp;&nbsp;
                        {item.product.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <h3>Total: {handleCalculateTotal(data).toFixed(0)}.000VNĐ</h3>
              </div>
              <span onClick={() => handlePayment()} className="btn-main lead">
                Proceed to payment
              </span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomBox;
