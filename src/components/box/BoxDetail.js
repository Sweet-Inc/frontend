import { useParams } from "@reach/router";
import React from "react";
import useFectch from "../../hook/GetFetch";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const BoxDetail = () => {
    const { id } = useParams();
    const { data: box, isPending, error } = useFectch('https://sweetincmgmtapi.azurewebsites.net/api/Boxes/GetByPrimaryKey/' + id);
///////////////////
   
    /////////////////////
    return (
            <React.Fragment>
              
 <GlobalStyles />
 <section className="container no-bottom">
            <div className="pattern_coll">
                <div className="nft_wrap">
                    <span>
                        <img
                            src={"./img/carousel/crs-2.jpg"}
                            className="lazy img-fluid"
                            alt="" />
                    </span>
                </div>
                <div className="nft_coll_info">
                    <br />
                    <span onClick={() => console.log('clicked')}>
                        <h4>abc</h4>
                    </span>
                    <span>123.000VNĐ</span>
                </div>
            </div>
            </section>
           
     <Footer />


            </React.Fragment>


          
    );
}

export default BoxDetail;