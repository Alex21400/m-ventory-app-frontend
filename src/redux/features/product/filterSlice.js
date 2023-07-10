import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            const { products, searchTerm } = action.payload

            const temporaryProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()))

            state.filteredProducts = temporaryProducts
        }
    }
})

export const { FILTER_BY_SEARCH } = filterSlice.actions

export default filterSlice.reducer