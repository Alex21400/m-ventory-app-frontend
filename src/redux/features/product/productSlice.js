import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productService";
import { toast } from "react-toastify";

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    totalStoreValue: 0,
    outOfStock: 0,
    categories: []
}

// Create new product
export const createProduct = createAsyncThunk('product/createProduct', async (formData, thunkAPI) => {
    try {
        return await productService.createNewProduct(formData)
    } catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        console.log(message)
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get all products
export const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, thunkAPI) => {
    try {
        return await productService.getAllProducts()
    } catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete a product
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id)
    } catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

// Get single product
export const getSingleProduct = createAsyncThunk('product/getSingleProduct', async (id, thunkAPI) => {
    try {
        return await productService.getSingleProduct(id)
    }catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

// Update product
export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, formData }, thunkAPI) => {
    try {
        return await productService.updateProduct(id, formData)
    }catch(error) {
        const message = (
            error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALCULATE_STORE_VALUE(state, action) {
            const { products } = action.payload

            // Loop through each product and calculate value
            const array = []

            products.forEach(product => {
                const { price, quantity } = product

                const value = price * quantity
                array.push(value)
            })

            const totalValue = array.reduce((accumulator, item) => (accumulator += item), 0)
            state.totalStoreValue = totalValue
        },
        CALCULATE_OUT_OF_STOCK(state, action) {
            const { products } = action.payload

            // Loop through products and calculate out of stock items
            const quantityArray = []

            products.forEach(product => {
                const { quantity } = product

                quantityArray.push(quantity)
            })

            let count = 0
            quantityArray.forEach(quantity => {
                if(quantity === 0 || quantity === '0') {
                    count += 1
                }
            })

            state.outOfStock = count
        },
        CALCULATE_CATEGORIES(state, action) {
            const { products } = action.payload

            const categoriesArray = []

            products.forEach(product => {
                const { category } = product

                categoriesArray.push(category)
            })

            const uniqueCategory = [...new Set(categoriesArray)]
            state.categories = uniqueCategory
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products.push(action.payload)
                toast.success('Product added')
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                toast.success('Product deleted successfully')
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.product = action.payload
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                toast.success('Product updated successfully')
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
    }
})

export const { CALCULATE_STORE_VALUE, CALCULATE_OUT_OF_STOCK, CALCULATE_CATEGORIES } = productSlice.actions

export default productSlice.reducer