import { useGetWishlistQuery } from '../lib/api/wishlistApi';
import { useSelector } from 'react-redux';
import { useMemo } from "react"


export const useIsWishlist = (productId) => {

    const token = useSelector(state => state.auth.token)


    const { data: wishList, isLoading, isError } = useGetWishlistQuery(undefined, {
        skip: !token,
    });

    const wishListMap = useMemo(() => new Map(wishList?.map((item) => [item?.productId?._id, item?._id])), [wishList])
    return {
        isWishlisted: wishListMap.has(productId),
        wishlistItemId: wishListMap.get(productId),
        isLoading,
        isError,
    }


}