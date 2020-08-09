import React, { useState, useEffect } from 'react'
import { Icon, Col, Row, Card } from "antd";
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const { Meta } = Card;

  useEffect(() => {
    const params = {
      skip,
      limit
    };

    getProduct(params);
  }, []);
  
  const getProduct = (params) => {
    axios.get("/api/products", params)
      .then(res => {
        if(res.data.success) {
          console.log(res);
          setProducts(res.data.products)
        }
      })
      .catch(err => console.log(err));
  }

  const handleLoadMore = () => {
    console.log(skip);
    setSkip(skip + limit);
    console.log(skip);
    
    const params = {
      skip,
      limit
    };

    getProduct(params);
  }

  const renderCard = products.map(product => (
    <Col lg={6} md={8} xs={24} key={product._id}>
      <Card
        hoverable={true}
        cover={<ImageSlider images={product.images} />}
      >
        <Meta title={product.title} description={`$${product.price}`} />
      </Card>
    </Col>
  ));

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>

        {/* Filter */}
        {/* Search */}

        { products.length === 0 
            ? (
              <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                <h2>No post yet !!</h2>
              </div>
            )
            : (
              <div>
                <Row gutter={[16, 16]}>
                  {renderCard}
                </Row>
              </div>
            )
        }

        {/* Load more button  */}
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
