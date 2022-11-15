import React from 'react';
import { Link } from '@reach/router';

const footer = () => (
  <footer className="footer-light">
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>About </h5>
            <ul>
              <li>All Candy</li>
              <li>Candy By Color</li>
              <li>Brands</li>
            </ul>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>More Info</h5>
            <ul>
              <li>Contact: 0933755852</li>
              <li>Email: TheCandyCompany@gmail.com</li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Newsletter</h5>
            <form
              action="#"
              className="row form-dark"
              id="form_subscribe"
              method="post"
              name="form_subscribe"
            >
              <div className="col text-center">
                <input
                  className="form-control"
                  id="txt_subscribe"
                  name="txt_subscribe"
                  placeholder="enter your email"
                  type="text"
                />
                <Link to="" id="btn-subscribe">
                  <i className="arrow_right bg-color-secondary"></i>
                </Link>
                <div className="clearfix"></div>
              </div>
            </form>
            <div className="spacer-10"></div>
          </div>
        </div>
      </div>
    </div>

    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open('', '_self')}>
                  <h3 style={{ fontWeight: 700, fontSize: '30px' }}>
                    The Candy Company
                  </h3>
                  <span
                    style={{ color: '#485460', fontWeight: 500 }}
                    className="copy"
                  >
                    &copy; Copyright 2021 - The Candy Company by Designesia
                  </span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-facebook fa-lg"></i>
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-linkedin fa-lg"></i>
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-pinterest fa-lg"></i>
                  </span>
                  <span onClick={() => window.open('', '_self')}>
                    <i className="fa fa-rss fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;
