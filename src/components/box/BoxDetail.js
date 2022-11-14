import { useParams } from "@reach/router";
import React from "react";
import useFectch from "../../hook/GetFetch";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import Header from "../menu/header";
const GlobalStyles = createGlobalStyle`
:root {
  scroll-behavior: unset;
}
`;

const BoxDetail = () => {
    const { id } = useParams();
    const { data: box, isPending, error } = useFectch('https://sweetincmgmtapi.azurewebsites.net/api/Boxes/GetByPrimaryKey/' + id);
    ///////////////////
    console.log(box)
    /////////////////////
    return (
        <React.Fragment>
            <GlobalStyles />
         <Header />

            <section className="container no-bottom">
            {error && <div>{error}</div>}
            {isPending && <div>Loading ...</div>}
               {box &&box.boxProducts.map((item)=>
               (
               <div className="pattern_coll">
               <div className="nft_wraps">
                   <span>
                       <img
                           src={item.product.image}
                           className="lazy img-fluid"
                           alt="" />
                   </span>
               </div>
               <div className="nft_coll_info">
                   <br />
                   <span onClick={() => console.log('clicked')}>
                       <h4>{item.product.name}</h4>
                   </span>
                   <span>{item.product.price}</span>
               </div>
           </div>
              ) )}
            </section>
            <Footer />
        </React.Fragment>



    );
}

export default BoxDetail;