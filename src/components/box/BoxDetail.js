import { useParams } from '@reach/router';
import React from 'react';
import useFectch from '../../hook/GetFetch';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import Header from '../menu/header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

const GlobalStyles = createGlobalStyle`
:root {
  scroll-behavior: unset;
}
`;

const BoxDetail = () => {
  const dispatch = useDispatch();

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { id } = useParams();
  const {
    data: box,
    isPending,
    error,
  } = useFectch(
    'https://sweetincmgmtapi.azurewebsites.net/api/Boxes/GetByPrimaryKey/' + id
  );
  ///////////////////
  console.log(box);

  /////////////////////
  if (!box) {
    return <div>... isLoading</div>;
  }
  return (
    <React.Fragment>
      <GlobalStyles />
      <Header />
      {/* box pattern info */}
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src={box.boxPattern.image}
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>{box.boxPattern.name}</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>total product:{' '}
                  {box.boxProducts.length}
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>price: {box.boxPattern.price}.000
                  VND
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>18
                </div>
              </div>

              <div className="author_list_info">
                <h4>
                  brand:{' '}
                  {box.boxProducts.map((e) => (
                    <p key={e.product.id}>{e.product.brand}</p>
                  ))}
                </h4>
              </div>
              <div>
                <span
                  className="btn-main lead"
                  onClick={() => dispatch(addItem())}
                >
                  Add to Cart
                </span>
              </div>

              <div className="spacer-40"></div>

              <div className="de_tab">
                <div className="de_tab_content"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* product show info */}

      <section className="container no-bottom">
        <Slider {...sliderSettings}>
          {box &&
            box.boxProducts.map((item) => (
              <div className="pattern_coll">
                <div className="nft_wraps">
                  <span>
                    <img
                      src={item.product.image}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </span>
                </div>
                <div className="nft_coll_info">
                  <br />
                  <span onClick={() => console.log('clicked')}>
                    <h4>{item.product.name}</h4>
                  </span>
                  <span>quantity: {item.product.quantity} pack</span>

                  <span>price: {item.product.price}.000 VND</span>
                </div>
              </div>
            ))}
        </Slider>
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default BoxDetail;
