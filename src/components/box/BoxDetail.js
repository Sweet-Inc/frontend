import { useParams } from '@reach/router';
import React from 'react';
import useFectch from '../../hook/GetFetch';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import Header from '../menu/header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { flexbox } from '@mui/system';

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
  return (
    <div className="box-detail">
      <GlobalStyles />
      <Header />
      {/* box pattern info */}
      {!isPending ? (
        <>
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
                      <i className="fa fa-archive"></i>total product:{' '}
                      {box.boxProducts.length}
                    </div>
                    <div className="item_info_views">
                      <i className="fa fa-money"></i>price: {box.boxPattern.price}
                      .000 VND
                    </div>
                   
                  </div>

                  <div className="author_list_info">
                    <h4 style={{ display: 'inline-block' }}>Brand:</h4>
                    <span> </span>
                    {[
                      ...new Set(
                        box.boxProducts.map((e) => e.product.brand.name)
                      ),
                    ].map((brand, index) => (
                      <span key={index} style={{fontSize: 20}}>
                        {' '}
                        {index !== 0 && '-'} {brand}{' '}
                      </span>
                    ))}
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
          <div className="item_info">
                      <h2 style={{textDecoration: "underline"}}>Products: </h2>
                    </div>
            <Slider {...sliderSettings}>
              {box &&
                box.boxProducts.map((item) => (
                  <Card sx={{ maxWidth: 560, maxHeight : 400, display: 'inline-flex'}}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.product.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.product.name}
                        </Typography>
                        {/* <Typography variant="subtitle1" color="text.secondary">
                         quantity: {item.product.quantity-54}
                        </Typography > */}
                        <Typography variant="subtitle2" color="text.secondary" fontSize="20">
                        <span>price: {item.product.price}.000 VND</span>
                        </Typography >
                      </CardContent>
                    </CardActionArea>
                  </Card>


                  // <div className="pattern_coll">
                  //   <div className="nft_wraps">
                  //     <span>
                  //       <img
                  //         src={item.product.image}
                  //         className="lazy img-fluid"
                  //         alt=""
                  //       />
                  //     </span>
                  //   </div>
                  //   <div className="nft_coll_info">
                  //     <br />
                  //     <span onClick={() => console.log('clicked')}>
                  //       <h4>{item.product.name}</h4>
                  //     </span>
                  //     <span>quantity: {item.product.quantity} pack</span>

                  //     <span>price: {item.product.price}.000 VND</span>
                  //   </div>
                  // </div>
                ))}
            </Slider>
          </section>
        </>
      ) : (
        <div>Loading...</div>
      )}

      <Footer />
    </div>
  );
};

export default BoxDetail;
