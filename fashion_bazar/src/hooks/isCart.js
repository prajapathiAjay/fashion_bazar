import {useSelector} from "react-redux";
import {useMemo} from "react"
import {useGetCartItemsQuery} from "../lib/api/cartApi"


// No productId argument — returns lookup functions, so it works on pages
// that show many products (wishlist panel) as well as a single product.
export const useCart=()=>{
 const token=useSelector((state)=>state.auth.token)
 const  {data:cart,isLoading,isError}=useGetCartItemsQuery(undefined,{
    skip:!token,
 })

 // Map: productId → cartItemId
 const cartMap=useMemo(()=>new Map(cart?.map((item)=>[item?.productID?._id,item?._id])),[cart])

return{
isInCart:(productId)=>cartMap.has(productId),
getCartItemId:(productId)=>cartMap.get(productId),
isLoading,
isError,

}




}
