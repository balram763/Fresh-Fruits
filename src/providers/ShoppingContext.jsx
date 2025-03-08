// import { createContext, useState } from "react";

// const ShoppingContext = createContext()

// export const Provider = ({children})=>{

//     const [product,setProduct] = useState([])
//     const [categoryProduct,setcategoryProduct] = useState([])
//     const [searchProduct,setSearchProduct] = useState([])
//     const [cardItems,setCardItems] = useState([])

//     const handlecardItem = (name,price,quantity) => {
//       const selectProduct = {
//         id : crypto.randomUUID(),
//         name,
//         price,
//         quantity
//       }
//       setCardItems([selectProduct,...cardItems])
//       window.alert('item added successfully')
      
//       return cardItems;
//         }

//     const handleCategory = (categories) => {
//       const Fruits = product.filter((user)=> user.category === categories)
//       setcategoryProduct(Fruits)
//     }
      

//     const getData = async() => {
//         const data = await fetchData()
//         setProduct(data)
//         console.log('get data working')
//       }


//       const productName = (searchProduct) => {
//         const onlyProduct = product.filter((user)=> user.name === searchProduct)
//         setSearchProduct(onlyProduct)
//       }

//       const sortProduct = (order) => {
//         setProduct((prevProducts) => {
//           if (!prevProducts) return [];
//           const sorted = [...prevProducts].sort((a, b) =>
//             order === "1" ? a.price - b.price : b.price - a.price
//           );
//           return sorted;
//         });
//       };
      

//      const fetchData = async() => {
//         const responce = await fetch('https://fruitapi-mf2v.onrender.com/data')
//         const data = await responce.json()
//         return data;
//       }


//       //Add Product
//       const newProducts = []
//       const AddProducts = (newProduct) => {
//         (newProducts.push(newProduct))
//         console.log(newProducts)
//         window.alert('product added')
//       }

//     return(
//         <ShoppingContext.Provider value={{product,getData,productName,sortProduct,AddProducts,handleCategory,categoryProduct,searchProduct,newProducts,handlecardItem,cardItems}}>
//             {children}
//         </ShoppingContext.Provider>
//     )
// }


// export default ShoppingContext;


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
