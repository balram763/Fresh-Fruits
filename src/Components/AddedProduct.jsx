// import React, { useContext } from 'react'
// import ShoppingContext from '../providers/ShoppingContext'
// import Card from './Card'

// const AddedProduct = () => {
//     const {newProducts} = useContext(ShoppingContext)
//     return (
//         <>
//     {
//       newProducts?.map(user => {
//         return ( <>
//           <Card user={user} key={user.id}/></>
//         )
//       })
//     }
//         </>
//       )
// }

// export default AddedProduct

import React, { useContext } from 'react'
import ShoppingContext from '../providers/ShoppingContext'
import Card from './Card'

const AddedProduct = () => {
    const {product} = useContext(ShoppingContext)
    return (
        <>
     {product?.map((user, index) => (
     index > 21 && <Card user={user} key={user._id} />
     ))}

        </>
      )
}

export default AddedProduct