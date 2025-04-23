// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ShoppingContext from "../providers/ShoppingContext";
// import toast from "react-hot-toast";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [qty, setQty] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [isBestSeller, setIsBestSeller] = useState(false);

//   console.log(description)
//   useEffect(() => {
//     const fetchProduct = async () => {
//       const response = await fetch(`https://fresh-fruits-backend.onrender.com/api/item/${id}`);
//       const product = await response.json()
//       if (product) {
//         setName(product.name);
//         setDescription(product.description);
//         setPrice(product.price);
//         setQty(product.qty);
//         setCategory(product.category);
//         setIsBestSeller(product.bestSeller);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleToggle = () => {
//     setIsBestSeller((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (image) {
//       formData.append("img", image);
//     }
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("description", description);
//     formData.append("qty", qty);
//     formData.append("category", category);
//     formData.append("bestSeller", isBestSeller);

//     console.log(formData)
//     const response = await fetch(`https://fresh-fruits-backend.onrender.com/api/admin/products/${id}`, {
//       method: "PUT",
//       body: formData,
//     });
//     if(!response.ok){
//       toast.error("something is wrong")
//     }

//     const data = await response.json()
//     if(response.ok){
//       navigate("/admin/products");
//       toast.success("product updated")
//     }
//   };

//   return (
//     <div className="container p-3 shadow mt-3 w-75">
//       <h1 className="text-center">Edit Product</h1>
//       <div className="card p-2">
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             className="form-control mt-4 p-2"
//             placeholder="Product Name"
//           />
//           <input
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             type="number"
//             className="form-control mt-4 p-2"
//             placeholder="Price"
//           />
//           <input
//             onChange={(e) => setImage(e.target.files[0])}
//             type="file"
//             className="form-control mt-4 p-2"
//             placeholder="Upload Image"
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="select-form w-100 rounded-2 mt-4 p-2"
//           >
//             <option value="">Select category</option>
//             <option value="Fruits">Fruits</option>
//             <option value="Vegatables">Vegetables</option>
//             <option value="Cooking ingredients">Cooking ingredients</option>
//             <option value="Dairy">Dairy</option>
//           </select>

//           <input
//             value={qty}
//             onChange={(e) => setQty(e.target.value)}
//             type="number"
//             className="form-control mt-4 p-2"
//             placeholder="Quantity"
//           />
//           <input
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             type="text"
//             className="form-control mt-4 p-2"
//             placeholder="Description"
//           />

//           <div
//             className={`btn ${
//               isBestSeller ? "btn-success" : "btn-outline-danger"
//             } w-100 mt-4`}
//             onClick={handleToggle}
//           >
//             {isBestSeller ? "Best Seller ✅" : "Not Best Seller ❌"}
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary form-control mt-4 p-2"
//           >
//             Update Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ShoppingContext from "../providers/ShoppingContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(ShoppingContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isBestSeller, setIsBestSeller] = useState(false);

  useEffect(() => {
    if (!user || !user?.isAdmin) {
      navigate("/login");
    }

    if (user) {
      fetchProduct();
    }
  }, [id, user]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fresh-fruits-backend.onrender.com/api/item/${id}`, {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      const product = await response.json();
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQty(product.qty);
        setCategory(product.category);
        setIsBestSeller(product.bestSeller);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const handleToggle = () => {
    setIsBestSeller((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append("img", image);
    }
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("qty", qty);
    formData.append("category", category);
    formData.append("bestSeller", isBestSeller.toString());

    try {
      const response = await fetch(
        `https://fresh-fruits-backend.onrender.com/api/admin/products/${id}`,
        {
          method: "PUT",
          headers: { authorization: `Bearer ${user?.token}` },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      toast.success("Product updated");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Network error occurred");
    }
  };

  return (
    <div className="container p-3 shadow mt-3 w-75">
      <h1 className="text-center">Edit Product</h1>
      <div className="card p-2">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control mt-4 p-2"
            placeholder="Product Name"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="form-control mt-4 p-2"
            placeholder="Price"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            className="form-control mt-4 p-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select-form w-100 rounded-2 mt-4 p-2"
          >
            <option value="">Select category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Cooking ingredients">Cooking ingredients</option>
            <option value="Dairy">Dairy</option>
          </select>
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type="number"
            className="form-control mt-4 p-2"
            placeholder="Quantity"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control mt-4 p-2"
            placeholder="Description"
          />
          <div
            className={`btn ${
              isBestSeller ? "btn-success" : "btn-outline-danger"
            } w-100 mt-4`}
            onClick={handleToggle}
            type="button"
          >
            {isBestSeller ? "Best Seller ✅" : "Not Best Seller ❌"}
          </div>
          <button
            type="submit"
            className="btn btn-primary form-control mt-4 p-2"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
