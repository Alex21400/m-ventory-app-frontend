import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../redux/features/product/productSlice'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: '',
    category: '',
    quantity: '',
    price: ''
}

const AddProduct = () => {
  const [product, setProduct] = useState(initialState)
  const [productImage, setProductImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')

  const { name, category, quantity, price } = product

  const { isLoading } = useSelector(state => state.product)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle field input change
  const handleInputChange = (e) => {
    const { name, value } = e.target 
    setProduct({...product, [name]: value})
  }

  // Handle image change
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  // Generate SKU for product out of category and random number
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase()
    const number = Date.now()

    const sku = letter + '-' + number
    return sku
  }

  const saveProduct = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('sku', generateSKU(category))
    formData.append('category', category)
    formData.append('quantity', quantity)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('image', productImage)

    await dispatch(createProduct(formData))

    navigate('/dashboard/stats')
  }

  return (
    <div>
        {isLoading && <Loader />}
        <h3 className='--mt' style={{ paddingLeft: '15px', textAlign: 'center'}}>Add New Product</h3>
        <ProductForm 
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
        />
    </div>
  )
}

export default AddProduct