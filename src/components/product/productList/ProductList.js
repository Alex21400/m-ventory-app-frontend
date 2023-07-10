import React, { useEffect, useState } from 'react'
import './ProductList.scss'
import { SpinnerImg } from '../../loader/Loader'
import { AiFillEye } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Search from '../../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH } from '../../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { deleteProduct, getAllProducts } from '../../../redux/features/product/productSlice'
import { Link } from 'react-router-dom'

const ProductList = ({ products, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const { filteredProducts } = useSelector(state => state.filter)
  const dispatch = useDispatch()

  // Shorten text function
  const shortenText = (text, chars) => {
    if(text.length > chars) {
        const shortenedText = text.substring(0, chars).concat('...')
        return shortenedText
    }

    return text
  }  

  // Delete product function
  const delProduct = async (id) => {
    await dispatch(deleteProduct(id))
    await dispatch(getAllProducts())
  }

  // Confirmation box
  const confirmDelete = (id) => {
    confirmAlert({
        title: 'Delete Product',
        message: 'Are you sure you want to delete this product?',
        buttons: [
          {
            label: 'Delete',
            onClick: () => delProduct(id)
          },
          {
            label: 'Cancel',
            // onClick: () => alert('Click No')
          }
        ]
      })
  }

  // Pagination begins

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // Pagination ends

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, searchTerm}))
  }, [dispatch, products, searchTerm])

  return (
    <div className='product-list'>
        <hr />
        <div className="table">
            <div className='--flex-between --flex-dir-column'>
                <span>
                    <h3>Inventory Items</h3>
                </span>
                <span>
                    <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </span>
            </div>

            {isLoading && <SpinnerImg />}
            <div className="table">
                {!isLoading && products.length === 0 ? (
                    <p>No products found! Please add some products first.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((product, index) => {
                                    const { _id, name, image, category, quantity, price } = product

                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td style={{ display: 'flex', alignItems: 'center'}}>
                                                <img src={image.filepath} alt='product-image' width={40} height={70} style={{ marginRight: '8px', objectFit: 'cover'}} />
                                                <h4>{shortenText(name, 16)}</h4> 
                                            </td>
                                            <td>{category}</td>
                                            <td>{quantity}</td>
                                            <td><b>{`$${price}`}</b></td>
                                            <td><b>{`$${quantity * price}`}</b></td>
                                            <td>
                                                <div className='icons'>
                                                  <span className='icon'>
                                                      <Link to={`product-details/${_id}`}>
                                                          <AiFillEye size={25} color='#03daa4'/>
                                                      </Link>
                                                  </span>
                                                  <span className='icon'>
                                                      <Link to={`edit-product/${_id}`}>
                                                        <FaRegEdit size={22} color='#1f93ff'/>
                                                      </Link>
                                                  </span>
                                                  <span className='icon'>
                                                      <MdDeleteForever size={25} color='black' onClick={() => confirmDelete(_id)}/>
                                                  </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )}
            </div>
            <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Prev"
            renderOnZeroPageCount={null}
            containerClassName='pagination'
            pageLinkClassName='page-num'
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeLinkClassName='activePage'
            />
        </div>
    </div>
  )
}

export default ProductList