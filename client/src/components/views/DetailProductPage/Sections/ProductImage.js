import React from 'react';
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {
  const images = props.detail.images && props.detail.images.map(image => ({
    original: `http://localhost:5000/${image}`,
    thumbnail: `http://localhost:5000/${image}`
  }));

  return (
    <div>
      { images && <ImageGallery items={images} /> }
    </div>
  )
}

export default ProductImage;
