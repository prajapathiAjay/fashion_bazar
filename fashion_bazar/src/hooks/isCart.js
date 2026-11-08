import {useSelector} from "react-redux";
import {useMemo} from "react"
import {useGetCartItemsQuery} from "../lib/api/cartApi"


// Pass one productId; returns whether that product is in the cart and its cart item id.
// For lists (wishlist), call it inside a per-item card component, not in a loop.
export const useCart=(productId)=>{
 const token=useSelector((state)=>state.auth.token)
 const  {data:cart,isLoading,isError}=useGetCartItemsQuery(undefined,{
    skip:!token,
 })

 // Map: productId → cartItemId
 const cartMap=useMemo(()=>new Map(cart?.map((item)=>[item?.productID?._id,item?._id])),[cart])

return{
isInCart:cartMap.has(productId),
getCartId:cartMap.get(productId),
isLoading,
isError,

}




}
