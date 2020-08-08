import React from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = () => {
  const onDrop = files => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0]);

    axios.post('/api/product/uploadImage')
  };

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
    </div>
  )
};

export default FileUpload