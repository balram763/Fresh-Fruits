import { createContext, useState, useEffect } from "react";

const ShoppingContext = createContext();

export const Provider = ({ children }) => {
  const [product, setProduct] = useState([]); 
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [user,setUser] = useState(null)
  const getData = async () => {
    try {
      const response = await fetch("https://fresh-fruits-backend.onrender.com/api/item");

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  // Add to Cart
  const handleCardItem = (name, price, quantity) => {
    setCardItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === name);
      
      if (existingItem) {
        // If item exists, update quantity
        return prevItems.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // If item doesn't exist, add new item
        return [{ id: crypto.randomUUID(), name, price, quantity }, ...prevItems];
      }
    });
  
    window.alert("Item added successfully");
  };
  

  
  
  


  const addProduct = async(newProduct) => {
    console.log(newProduct)
    const response = await fetch("https://fresh-fruits-backend.onrender.com/api/item/add", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = response.json()
    setNewProducts(data);

    window.alert("Product added successfully");
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

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        localStorage.setItem("userdetail", JSON.stringify(data));


        console.log("Stored User Data:", JSON.parse(localStorage.getItem("userdetail")));


        setUser(data);

    } catch (error) {
        console.error("Login Error:", error.message);
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

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        localStorage.setItem("userdetail",JSON.stringify(data))
        setUser(data)
        
    } catch (error) {
        console.error("Register Error:", error.message);
    }
};

 const Logout = () => {
  setUser(null)
  localStorage.removeItem("userDetail")
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
        setUser
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
