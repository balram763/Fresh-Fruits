import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const ShoppingContext = createContext();

export const Provider = ({ children }) => {
  const [product, setProduct] = useState([]); 
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(false)
  const [isError,setIsError] = useState(false)

  const getData = async () => {
    try {
      const response = await fetch("https://fresh-fruits-backend.onrender.com/api/item");
      const data = await response.json();
      return data
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };


  let { data : products, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });
  if(error){
    toast.error('Something Went Wrong')
  }

  useEffect(()=>{
    if(products){
      setProduct(products)
    }
  },[products])

  const bestSeller = product?.filter((item)=>item.bestSeller)
   const suggestions = product?.slice(Math.floor(Math.random()*25))

  const productName = (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredProducts = product.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredProducts);
  };


  const sortProduct = (order) => {
    setProduct((prevProducts) => {
      if (!prevProducts || prevProducts.length === 0) return [];

      const sorted = [...prevProducts].sort((a, b) =>
        order === "1" ? a.price - b.price : order === '2' ? b.price - a.price : a
      );

      return sorted;
    });
  };
  

  




  const handleCategory = (category) => {
    const filtered = product.filter((item) => item.category === category);
    setCategoryProduct(filtered);
  };





  const handleCardItem = (name, price, quantity) => {
   
    const existingItem = cardItems.find((item) => item.name === name);
    let updatedCart;
  
    if (existingItem) {
      updatedCart = cardItems.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCart = [...cardItems, { _id: crypto.randomUUID(), name, price, quantity }];
    }
    handleCartChange(updatedCart);

  };
  

  const handleCartChange = async (updatedCart) => {
    setLoading(true);

    if(user){
  
    await toast.promise(
      (async () => {
        const response = await fetch('https://fresh-fruits-backend.onrender.com/api/cart/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user?.token ? `Bearer ${user.token}` : '',
          },
          body: JSON.stringify({ cart: updatedCart }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update cart. Please login.');
        }
  
        setCardItems(updatedCart);
      })(),
      {
        loading: 'Updating cart...',
        success: 'Cart updated successfully!',
        error: 'Please login.',
      }
    )
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
    }else{
      toast.error('Please Login...')
    }
  };
  
  

  const addProduct = async (newProduct) => {

    const response = await fetch("https://fresh-fruits-backend.onrender.com/api/item/add", {
        method: "POST",
        body: newProduct,
    });

    if (!response.ok) {
        toast.error("Failed to add product");
        return;
    }

    const data = await response.json();
    setNewProducts(data);

    toast.success("Product added successfully");
};




//   const handleLogin = async (formData) => {
//     try {
//         const response = await fetch("https://fresh-fruits-backend.onrender.com/api/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();

//         if (data.token) {
//           localStorage.setItem("token", JSON.stringify(data));
//           setUser(localStorage.getItem("token"));
//           toast.success('Successfully Login')
//       } 
//       else {
//           toast.error('Invalid Credentials')
//       }

//     } catch (error) {

//         toast.error('Something went wrong....')
//     }
// };

const handleLogin = async (formData) => {
  const loginPromise = fetch("https://fresh-fruits-backend.onrender.com/api/user/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
  }).then(async (response) => {
      if (!response.ok) throw new Error("Invalid Credentials");
      const data = await response.json();
      if (data) {
          localStorage.setItem("token", JSON.stringify(data));
          setUser(data);
          return "Successfully Logged In!";
      } else {
          throw new Error("Invalid Credentials");
      }
  });

  toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (msg) => msg,
      error: (err) => err.message || "Something went wrong...",
  });

  
};



const handleRegister = async (formData) => {
  const registerPromise = fetch("https://fresh-fruits-backend.onrender.com/api/user/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
  }).then(async (response) => {
      if (!response.ok) throw new Error("Email Already Registered");

      const data = await response.json();
      localStorage.setItem("token", JSON.stringify(data));
      setUser(data);
      return "Successfully Registered!";
  });

  toast.promise(registerPromise, {
      loading: "Registering...",
      success: (msg) => msg,
      error: (err) => err.message || "Something went wrong...",
  });
};


 const Logout = () => {
  setUser(null)
  localStorage.removeItem("token")
  toast.success('logged out')
 }


  return (
    <ShoppingContext.Provider
      value={{
        product,
        categoryProduct,
        searchResults,
        setCardItems,
        cardItems,
        newProducts,
        getData,        
        productName,   
        sortProduct, 
        handleCategory,
        handleCardItem,
        addProduct,
        handleLogin,
        handleRegister,
        user,
        Logout,
        setUser,
        handleCartChange,
        bestSeller,
        suggestions,
        isLoading
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
