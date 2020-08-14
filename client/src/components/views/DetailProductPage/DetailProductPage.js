import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function DetailProductPage(props) {
  const [product, setProduct] = useState({});
  const productId = props.match.params.productId;

  useEffect(() => {
    axios.get(`/api/products/${productId}?type=single`)
      .then(res => {
        console.log(res);
        setProduct(res.data.product);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{product.title}</h1>
      </div>

      <Row gutter={[16,16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo detail={product} />
        </Col>
      </Row>
    </div>
  )
}

export default DetailProductPage;
