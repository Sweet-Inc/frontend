import React from 'react';
import SliderMain from '../components/SliderMain';
import Catgor from '../components/Catgor';
import Footer from '../components/footer';
import useFetch from '../../hook/GetFetch';
import BoxList from '../box/BoxList';

const Home = () => {
  const {
    data: box,
    isPending,
    error,
  } = useFetch('https://sweetincmgmtapi.azurewebsites.net/api/Boxes/GetAll');

  const handleTransformData = (boxs) => {
    let data = [];
    for (let i = 0; i < boxs.length; i++) {
      if (boxs[i].boxPattern.status) {
        data.push({ ...boxs[i].boxPattern, boxId: boxs[i].id });
      }
    }
    data = data.reduce(
      (items, item) =>
        items.find((x) => x.id === item.id) ? [...items] : [...items, item],
      []
    );
    return data;
  };
  console.log(box);

  return (
    <div>
      <section
        id="mySliderMain"
        className="jumbotron breadcumb no-bg h-vh"
        style={{
          backgroundImage: `url(${'./img/bg-shape-2.png'})`,
          filter: 'brightness(0.4)',
        }}
      ></section>
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '0%',
          zIndex: '99',
          width: '100%',
        }}
      >
        <SliderMain />
      </div>

      <section className="container no-bottom">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Interesting box pattern</h2>
              <div className="small-border"></div>
            </div>
          </div>

          <div className="a">
            {error && <div>{error}</div>}
            {isPending && <div>Loading ...</div>}
            {box && <BoxList boxs={box}></BoxList>}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Brands</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <Catgor />
      </section>

      <Footer />
    </div>
  );
};
export default Home;
