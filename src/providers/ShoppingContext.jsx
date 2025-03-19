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

  const bestSeller = product.filter((item)=>item.bestSeller)
   const suggestions = product.slice(Math.floor(Math.random()*25))
  const getData = async () => {
    try {
      const response = await fetch("https://fresh-fruits-backend.onrender.com/api/item");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        order === "1" ? a.price - b.price : b.price - a.price
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




  const handleLogin = async (formData) => {
    try {
        const response = await fetch("https://fresh-fruits-backend.onrender.com/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.token) {
          localStorage.setItem("token", JSON.stringify(data));
          setUser(localStorage.getItem("token"));
          toast.success('Successfully Login')
      } 
      else {
          toast.error('Invalid Credentials')
      }

    } catch (error) {

        toast.error('Something went wrong....')
    }
};

  const handleRegister = async (formData) => {
    try {
        const response = await fetch("https://fresh-fruits-backend.onrender.com/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });



        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", JSON.stringify(data));
          setUser(localStorage.getItem("token"));
          toast.success('Successfully Register!')
      } else {
        toast.error('Email Already Register')

      }
        
    } catch (error) {
        toast.error('Something went wrong....')
    }
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
        suggestions
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
