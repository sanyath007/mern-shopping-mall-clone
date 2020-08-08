import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = (props) => {
  const [images, setImages] = useState([]);

  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0]);

    axios.post('/api/products/uploadImage', formData, config)
      .then(res => {
        setImages([...images, res.data.image]);
        props.refreshFunction([...images, res.data.image]);
      })
      .catch(err => console.log(err));
  };

  const onDelete = image => {
    const currentIndex = images.indexOf(image);
    const newImages = images;

    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop}>
        { ({getRootProps, getInputProps}) => (
          <div
            style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            { ...getRootProps() }
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: '3rem' }} />
          </div>
        )}   
      </Dropzone>

      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        { images.map((image, index) => (
          <div onClick={ () => onDelete(image)} key={image}>
            <img
              src={ `http://localhost:5000/${image}` }
              style={{ width: '100%', height: '100%', minWidth: '300px' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export default FileUpload