// import React, { useContext, useEffect, useState } from 'react'
// import ShoppingContext from '../providers/ShoppingContext'
// import { Link } from 'react-router-dom'
// import AddtoCardBtn from './AddtoCardBtn'



// const Navbar = () => {


//   const {productName,sortProduct} = useContext(ShoppingContext)
//   const [text, setText] = useState('')
//   const [sort,setSort] = useState(1)

//   useEffect(()=>{
//     sortProduct(sort)
//   },[sort])

  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     productName(text)
//     setText('')
//     // console.log(text)
//   }

//   return (
//     <nav className="navbar p-3 bg-light shadow " id='navbarbg'>
//     <div className="container-fluid">
//       <Link to={'/'} className="navbar-brand fw-bold fs-3 text-warning"><i style={{color:'green'}} className="fa-solid fa-spray-can-sparkles"></i> <span style={{color: 'green'}}>Fresh</span> Product</Link>
     
//        <div className='d-flex'>
//         <Link to={'/listproduct'} className="btn btn-sm p-2 btn-outline-warning">
//         <i className="fa-solid fa-plus"></i> Product
//         </Link>
//       <form>

//       <select onChange={(e)=>setSort(e.target.value)} style={{width : '80px'}} className="btn mx-3 form-select btn-light" id="inputGroupSelect01">
//     <option >Sort</option>
//     <option value="1">LOW to HIGH</option>
//     <option value="2">HIGH to LOW</option>
//   </select>

//       </form>


//       <form onSubmit={(e)=>handleSubmit(e)} className="d-flex" role="search">
//         <input onChange={(e)=>setText(e.target.value)} value={text} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        
//         <button className="btn btn-outline-dark" type="submit">Search</button>
//       </form>
//     <AddtoCardBtn/>
//     </div>
//     </div>
//   </nav>
//   )
// }

// export default Navbar

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingContext from '../providers/ShoppingContext';
import AddtoCardBtn from './AddtoCardBtn';

const Navbar = () => {
  const { productName, sortProduct, searchResults, setSearchResults,user } = useContext(ShoppingContext);
  const [text, setText] = useState('');
  const [sort, setSort] = useState(1);

  useEffect(() => {
    sortProduct(sort);
  }, [sort]);


  const handleSearchChange = (e) => {
    e.preventDefault()
    const query = e.target.value;
    setText(query);
    productName(query);
  };

  const handleSelectItem = (item) => {
    e.preventDefault()
    setText(''); 
    setSearchResults([]);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3">
      <div className="container-fluid">
        
        <Link to="/" className="navbar-brand fw-bold fs-3 text-warning">
          <i style={{ color: 'green' }} className="fa-solid fa-spray-can-sparkles"></i>
          <span style={{ color: 'green' }}>Fresh</span> Product
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

            

            <li className="nav-item">
              <select
                onChange={(e) => setSort(e.target.value)}
                className="form-select btn-light mt-2 me-2"
                style={{ width: '130px' }}
              >
                <option value="0">Sort</option>
                <option value="1">LOW to HIGH</option>
                <option value="2">HIGH to LOW</option>
              </select>
            </li>


            <li className="nav-item">
              <div className="d-flex position-relative mt-2">
                <input
                  onChange={handleSearchChange} 
                  value={text}
                  className="form-control"
                  type="search"
                  placeholder="Search products"
                  aria-label="Search"
                />


                {searchResults.length > 0 && (
                  <ul
                    className="dropdown-menu show position-absolute w-100"
                    style={{ top: '100%', zIndex: 10 }}
                  >
                    {searchResults.map((item) => (
                      <li key={item._id} className="dropdown-item">
                        <Link
                          to={`/${item._id}`}
                          className="text-dark"
                          style={{ textDecoration: 'none' }}
                          onClick={(e) => handleSelectItem(e)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>



            {user ? 
            <>
            <li className="nav-item mt-2">
               <AddtoCardBtn />
            </li>

            <li className="nav-item mt-2">
              <Link to="/listproduct" className="btn btn-sm p-2 btn-outline-warning me-2">
                <i className="fa-solid fa-plus"></i> Product
              </Link>
            </li>
            
               <li className="nav-item mt-2">
                 <Link to={'/user/profile'} className='btn btn-sm btn-success fs-5'><i className="fa-solid fa-user"></i></Link>
               </li>
               
   
               </> 
            :  <li className="nav-item mt-2 ms-2">
                 <Link to={'/login'} className='btn btn-sm btn-success'>LogIN</Link>
               </li>}



          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
