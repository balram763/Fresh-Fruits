import { createContext, useState } from "react";

const ShoppingContext = createContext()

export const Provider = ({children})=>{

    const [product,setProduct] = useState([])
    const [categoryProduct,setcategoryProduct] = useState([])
    const [searchProduct,setSearchProduct] = useState([])
    const [cardItems,setCardItems] = useState([])

    const handlecardItem = (name,price,quantity) => {
      const selectProduct = {
        id : crypto.randomUUID(),
        name,
        price,
        quantity
      }
      setCardItems([selectProduct,...cardItems])
      window.alert('item added successfully')
      
      return cardItems;
        }

    const handleCategory = (categories) => {
      const Fruits = product.filter((user)=> user.category === categories)
      setcategoryProduct(Fruits)
    }
      

    const getData = async() => {
        const data = await fetchData()
        setProduct(data)
        console.log('get data working')
      }

      // const productName = (searchProduct) => {
      //   const onlyProduct = product.filter((user)=> user.name === searchProduct)
      //   setProduct(onlyProduct)
      // }

      //


      const productName = (searchProduct) => {
        const onlyProduct = product.filter((user)=> user.name === searchProduct)
        setSearchProduct(onlyProduct)
      }




      const sortProduct = (num) => {
        if(num == "1"){
            const sortedProduct = product.sort((a,b) => a.price - b.price)
            setProduct(sortedProduct)
            console.log(num)
        
        }

        else if (num == "2"){
            const sortedProducts = product.sort((a,b) => b.price - a.price)
            setProduct(sortedProducts)
            console.log(num)
        }else{
          console.log(`something went wrong`)
        }
      }

     const fetchData = async() => {
        const responce = await fetch('https://fruitapi-mf2v.onrender.com/data')
        const data = await responce.json()
        return data;
      }


      //Add Product
      const newProducts = []
      const AddProducts = (newProduct) => {
        (newProducts.push(newProduct))
        console.log(newProducts)
        window.alert('product added')
      }

      //add to card 

    return(
        <ShoppingContext.Provider value={{product,getData,productName,sortProduct,AddProducts,handleCategory,categoryProduct,searchProduct,newProducts,handlecardItem,cardItems}}>
            {children}
        </ShoppingContext.Provider>
    )
}


export default ShoppingContext;