import axios from 'axios'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// Create new product
const createNewProduct = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}/api/products`, formData)

    return response.data
}

// Get all products
const getAllProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/products`)

    return response.data
}

// Delete a product
const deleteProduct = async (id) => {
    const response = await axios.delete(`${BACKEND_URL}/api/products/${id}`)

    return response.data
}

// Get single product
const getSingleProduct = async (id) => {
    const response = await axios.get(`${BACKEND_URL}/api/products/${id}`)

    return response.data
}

// Update product
const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${BACKEND_URL}/api/products/${id}`, formData)

    return response.data
}

const productService = {
    createNewProduct,
    getAllProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct
}

export default productService