import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
]
const UploadProductPage = props => {
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    continents: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    const newProduct = {
      writer: props.user.userData._id,
      images,
      ...product
    };
    console.log(newProduct);

    axios.post('/api/products', product)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  const updateImage = newImages => {
    console.log(newImages);
    setImages(newImages);
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title>UploadProductPage</Title>
      </div>

      <Form onSubmit={handleSubmit}>
        {/* Dropzone */}
        <FileUpload refreshFunction={updateImage} />

        <label>Title</label>
        <Input type="text" value={product.title} name="title" onChange={handleChange} /><br/><br/>

        <label>Description</label>
        <TextArea type="text" value={product.description} name="description" onChange={handleChange} /><br/><br/>

        <label>Price</label>
        <Input type="number" value={product.price} name="price" onChange={handleChange} /><br/><br/>

        <select name="continents" onChange={handleChange}>
          { continents.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select><br/><br/>

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  )
}

export default UploadProductPage

