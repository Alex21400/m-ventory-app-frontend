import React from 'react'
import Card from '../../card/Card'
import './ProductForm.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({ 
  product, 
  productImage, 
  imagePreview, 
  description, 
  setDescription, 
  handleInputChange, 
  handleImageChange, 
  saveProduct }) => {
  return (
    <div className='add-product'>
      <Card cardClass={'card'}>
        <form onSubmit={saveProduct}>
          {/* Card around image part */}
          <Card cardClass={'group'}>
            <label>Product Image:</label>
            <code className='--color-dark' style={{ fontSize: '12px'}}>Supported formats - jpg, jpeg, png</code>
            <input type="file" name='image' onChange={(e) => handleImageChange(e)}/>
            {imagePreview !== null ? (
              <div className='image-preview'>
                <img src={imagePreview} alt="product" style={{ objectFit: 'cover' }}/>
              </div>
            ) : (
              <p>No image selected</p>
            )}
          </Card>
          <label>Product name:</label>
          <input type="text" name='name' value={product?.name} onChange={(e) => handleInputChange(e)}/> 
          <label>Product category:</label>
          <input type="text" name='category' value={product?.category} onChange={(e) => handleInputChange(e)} />
          <label>Product price:</label>
          <input type="text" name='price' value={product?.price} onChange={(e) => handleInputChange(e)} />
          <label>Product quantity:</label>
          <input type="text" name='quantity' value={product?.quantity} onChange={(e) => handleInputChange(e)} />
          <label>Product description:</label>
          <ReactQuill theme="snow" value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats} />

          <div className="--my">
            <button type='submit' className='--btn --btn-primary'>Save Product</button>
          </div>
        </form>
      </Card>
    </div>
  )
}

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm