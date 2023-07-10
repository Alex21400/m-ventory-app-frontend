import React, { useEffect } from 'react'
import './ProductDetails.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../../../redux/features/product/productSlice'
import useRedirectLoggedOutUser from '../../customHooks/useRedirectLoggedOutUser'
import Card from '../../card/Card'
import { SpinnerImg }from '../../loader/Loader'
import DOMPurify from 'dompurify'

const ProductDetails = () => {
  useRedirectLoggedOutUser('/')

  const { id } = useParams()
  const { isLoggedIn } = useSelector(state => state.auth)
  const { product, isLoading, isError, message } = useSelector(state => state.product)

  const dispatch = useDispatch()

  // Get availabilty of product based on quantity
  const getProductAvailability = (quantity) => {
    if(quantity > 0) {
      return <span className='--color-success'>In Stock</span>
    } else {
      return <span className='--color-danger'>Out Of Stock</span>
    }
  }

  // Format the commas for number
  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  }
  
  useEffect(() => {
    if(isLoggedIn === true) {
        dispatch(getSingleProduct(id))
    }

    if(isError) {
        console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch, id])

  return (
  <>
    <h2 className='--mt' style={{ paddingLeft: '15px' }}>Product Details</h2>
    <div className='product-details'> 
    {isLoading && <SpinnerImg />}
    {product && (
      <>
      <div className='img-wrapper'>
      <Card cardClass='group'>
        {product?.image ? (
          <img src={product.image.filepath} alt={product.image.filename} />
        ) : (
          <p>No image for this product...</p>
        )} 
      </Card>  
    </div>
    <div className="description">
      <h4>
        <span className='badge'>Name: </span>
        <span>&nbsp; {product.name}</span>
      </h4>
      <ul>
        <li>
          <p><b>SKU:</b>&nbsp; {product.sku}</p>
        </li>
        <li>
          <p><b>Category:</b>&nbsp; {product.category}</p>
        </li>
        <li>
          <p><b>Price:</b>&nbsp; <b>${product.price}</b></p>
        </li>
        <li>
          <p><b>Quantity in Stock:</b>&nbsp; {product.quantity}</p>
        </li>
        <li>
          <p><b>Total Value in Stock:</b>&nbsp; <b>${numberWithCommas(product.price * product.quantity)}</b></p>
        </li>
        <br />
        <hr />
        <br />
        <li>
          <p><b>Description:</b></p>
          <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description)}}></div>
        </li>
      </ul>
      <br />
      <hr />
      <code>Created At: {product.createdAt.toLocaleString('en-US')}</code>
      <br />
      <code>Last updated: {product.updatedAt.toLocaleString('en-US')}</code>
      <h3>Product availability: {getProductAvailability(product.quantity)}</h3>
    </div>
    </>
    )}
    </div>
  </>
  )
}

export default ProductDetails