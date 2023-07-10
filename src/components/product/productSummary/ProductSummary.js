import React, { useEffect } from 'react'
import './ProductSummary.scss'
import { MdShoppingCart, MdRemoveShoppingCart } from 'react-icons/md'
import { FaMoneyBillWave } from 'react-icons/fa'
import { BiSolidBookmarkAlt } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import { useDispatch, useSelector } from 'react-redux'
import { CALCULATE_CATEGORIES, CALCULATE_OUT_OF_STOCK, CALCULATE_STORE_VALUE } from '../../../redux/features/product/productSlice'

// icons
const totalProducts  = <MdShoppingCart size={40} color='#fff' />
const outOfStockIcon = <MdRemoveShoppingCart size={40} color='#fff' />
const value = <FaMoneyBillWave size={40} color='#fff' />
const categoriesIcon = <BiSolidBookmarkAlt size={40} color='#fff' />

// Add commas to the number
const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}

const ProductSummary = ({ products }) => {
  const { totalStoreValue, outOfStock, categories } = useSelector(state => state.product)
  const dispatch = useDispatch()

  // Calculate total store value
  useEffect(() => {
    dispatch(CALCULATE_STORE_VALUE({products}))
    dispatch(CALCULATE_OUT_OF_STOCK({products}))
    dispatch(CALCULATE_CATEGORIES({products}))
  }, [products, dispatch])

  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox icon={totalProducts} title={'Total Products'} count={products.length} bgColor='card1' />
        <InfoBox icon={outOfStockIcon} title={'Out Of Stock'} count={outOfStock} bgColor='card3' />
        <InfoBox icon={value} title={'Total Store Value'} count={`$${numberWithCommas(totalStoreValue.toFixed(2))}`} bgColor='card2' />
        <InfoBox icon={categoriesIcon} title={'All Categories'} count={categories.length} bgColor='card4' />
      </div>
    </div>
  )
}

export default ProductSummary