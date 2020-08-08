import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

const continens = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
]
const UploadProductPage = () => {
  const [images, setImages] = useState([]);
  const [values, setValues] = useState({
    title: '',
    description: '',
    price: 0,
    continents: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log('name is ', name);
    console.log('value is ', value);

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    console.log(values);
  }

  const updateImage = newImage => {
    console.log(newImage);
    setImages(newImage);
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
        <Input type="text" value={values.title} name="title" onChange={handleChange} /><br/><br/>

        <label>Description</label>
        <TextArea type="text" value={values.description} name="description" onChange={handleChange} /><br/><br/>

        <label>Price</label>
        <Input type="number" value={values.price} name="price" onChange={handleChange} /><br/><br/>

        <select name="continens" onChange={handleChange}>
          { continens.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select><br/><br/>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default UploadProductPage

