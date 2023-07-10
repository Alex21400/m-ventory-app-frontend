import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllProducts, getSingleProduct, updateProduct } from '../../redux/features/product/productSlice'
import Loader from '../../components/loader/Loader'
import ProductForm from '../../components/product/productForm/ProductForm'

const EditProduct = () => {
  const { id } = useParams()

  const { isLoading } = useSelector(state => state.product)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productToEdit = useSelector(state => state.product.product)

  const [product, setProduct] = useState(productToEdit)
  const [productImage, setProductImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')

  // Load the product from id
  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [dispatch, id])

  // Set product, imagePreview and description on page load
  useEffect(() => {
    setProduct(productToEdit)
    setImagePreview(
        productToEdit && productToEdit.image ? `${productToEdit.image.filepath}` : null
    )
    setDescription(
        productToEdit && productToEdit.description ? productToEdit.description : null
    )
  }, [productToEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target 
    setProduct({...product, [name]: value })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  // Save product on submit
  const saveProduct = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', product?.name)
    formData.append('category', product?.category)
    formData.append('quantity', product?.quantity)
    formData.append('price', product?.price)
    formData.append('description', description)
    if(productImage) {
        formData.append('image', productImage)
    }

    await dispatch(updateProduct({ id, formData }))
    await dispatch(getAllProducts())
    navigate('/dashboard/stats')
  }

  return (
    <div>
        {isLoading && <Loader />}
        <h3 className='--mt' style={{ paddingLeft: '15px', textAlign: 'center'}}>Edit Product</h3>
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

export default EditProduct