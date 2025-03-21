import React from 'react';
import FooterDown from './FooterDown';

const Footer = () => {
  return (
    <div className="bg-light pt-4">

      {/* <div className="d-flex card align-items-center rounded-0 p-md-5 border-0">
        <div className="d-md-flex w-100 justify-content-around text-center text-md-start">
          
          <div className="fs-4 card-body">
            <h5 className="card-title text-danger fw-bold">Best Price</h5>
            <p className="card-text fs-6 text-muted">
              Get the best price in the market with unbeatable deals, top-quality products, and amazing discounts. Shop now and save big!
            </p>  
          </div>

          <div className="fs-4 card-body">
            <h5 className="card-title text-danger fw-bold">100% Organic</h5>
            <p className="card-text fs-6 text-muted">
              Experience 100% organic, farm-fresh goodness with pure, chemical-free, and naturally grown products for a healthier lifestyle.
            </p>  
          </div>

          <div className="fs-4 card-body">
            <h5 className="card-title text-danger fw-bold">Fresh</h5>
            <p className="card-text fs-6 text-muted">
              Enjoy farm-fresh items with the best quality, natural taste, and unbeatable freshness. Shop now for healthy, organic, and delicious products!
            </p>  
          </div>

        </div>
      </div> */}

<div className="bg-light py-5">
      <div className="container">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow p-4 rounded hover-effect">
              <div className="card-body">
                <i className="fas fa-tags text-danger fs-1 mb-3"></i>
                <h5 className="card-title text-danger fw-bold">Best Price</h5>
                <p className="card-text text-muted">
                  Get unbeatable deals and top-quality products at the most affordable prices. Save big while shopping!
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow p-4 rounded hover-effect">
              <div className="card-body">
                <i className="fas fa-seedling text-success fs-1 mb-3"></i>
                <h5 className="card-title text-success fw-bold">100% Organic</h5>
                <p className="card-text text-muted">
                  Enjoy farm-fresh, chemical-free, naturally grown products for a healthier and more sustainable lifestyle.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow p-4 rounded hover-effect">
              <div className="card-body">
                <i className="fas fa-apple-alt text-primary fs-1 mb-3"></i>
                <h5 className="card-title text-primary fw-bold">Freshness Guaranteed</h5>
                <p className="card-text text-muted">
                  Experience the freshest quality with every purchase. We ensure natural taste, best quality, and ultimate freshness!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


      <FooterDown/>
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-3">

        <ol className="list-group list-group-horizontal gap-3">
          <li className="fs-2 list-group-item border-0">
          <a href="https://www.instagram.com/balram_dhakad1" target="_blank"  className="fs-2 list-group-item border-0 text-dark">
          <i className="fa-brands fa-square-instagram text-danger hover-scale"></i>
          </a>
            
          </li>
          <a href="https://github.com/balram763" target="_blank"  className="fs-2 list-group-item border-0 text-dark">
            <i className="fa-brands fa-github hover-scale"></i>
          </a>
          <a href="https://www.linkedin.com/in/balram-dhakad-a996bb209" target="_blank"  className="fs-2 list-group-item border-0 text-primary">
            <i className="fa-brands fa-linkedin hover-scale"></i>
          </a>
          <a href="https://x.com/balram763" target="_blank"  className="fs-2 list-group-item border-0 text-primary">
            <i className="fa-brands fa-x hover-scale"></i>
          </a>
        </ol>

        

        <div className="text-center text-md-end">
          <div className="fs-5 fw-bold text-danger">
            Developed By <i className="fa-solid fa-heart text-danger"></i>
          </div>
          <p className="fw-bold fs-5 text-primary m-0">Balram Dhakad</p>
        </div>

      </div>
      



    </div>
  );
};

export default Footer;
