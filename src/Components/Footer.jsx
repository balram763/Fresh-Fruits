import React from 'react'

const Footer = () => {
  return (
    <div className=''>
    <div className="d-flex card align-item-center shadow rounded-0  p-md-5">
        <div className=" px-5 d-md-flex w-75 w-100">
            
        
        <div className="fs-4 card-body">
            <h5 className="card-title text-danger">Best Price</h5>
            <p className="card-text fs-6 ">Get the best price in the market with unbeatable deals, top-quality products, and amazing discounts. Shop now and save big!</p>  
        </div>
        <div className="fs-4 card-body ">
            <h5 className="card-title text-danger">100% Organic</h5>
            <p className="card-text fs-6">Experience 100% organic, farm-fresh goodness with pure, chemical-free, and naturally grown products for a healthier lifestyle.</p>  
        </div>
        <div className="fs-4 card-body">
            <h5 className="card-title text-danger">Fresh</h5>
            <p className="card-text fs-6">Enjoy farm-fresh items with the best quality, natural taste, and unbeatable freshness. Shop now for healthy, organic, and delicious products!</p>  
        </div>
    </div>
    </div>
    <div className='border-bottom border border-primary '></div>

    <div style={{height :'15vh',width:'100%',paddingLeft:'80px'}} className=' mt-3 d-md-flex  align-items-center'>
        <ol style={{height :'7vh',width:'50%'}} className=' list-group d-flex list-group-horizontal'>
        <li className='fs-2 list-group-item '><i className="fa-brands fa-square-instagram"></i></li>
        <a href='https://github.com/balram763' className='fs-2 list-group-item'><i className="fa-brands fa-github"></i></a>
        <a href='' className='fs-2 list-group-item'><i className="fa-brands fa-linkedin"></i></a>
        <a href='' className='fs-2 list-group-item'><i className="fa-brands fa-facebook"></i></a>
        </ol>

        <div style={{height :'10vh',width:'70%'}} className='ps-5 mt-2'><div className='fs-5 fw-bold text-danger'>developed By <i className="fa-solid fa-heart"></i></div>
        <p className='fw-bold fs-5 text-primary'>Balram Dhakad</p></div>
    </div>
    </div>
  )
}

export default Footer