import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/features/product/productSlice'
import ProductList from '../../components/product/productList/ProductList'
import ProductSummary from '../../components/product/productSummary/ProductSummary'

const Stats = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const { products, isLoading, isError, message } = useSelector(state => state.product)

  const dispatch = useDispatch()

  useEffect(() => {
    if(isLoggedIn === true) {
        dispatch(getAllProducts())
    }

    if(isError) {
        console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div style={{ paddingLeft: '15px'}}>
        <ProductSummary products={products}/>
        <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}

export default Stats