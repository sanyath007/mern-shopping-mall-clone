import React, { useState, useEffect } from 'react'
import { Icon, Col, Row, Card } from "antd";
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import FilterCheckbox from './Filters/Checkbox'

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [filters, setFilters] = useState({
    continents: [],
    price: []
  });
  const { Meta } = Card;

  useEffect(() => {
    const params = {
      skip,
      limit
    };

    getProduct(params);
  }, []);
  
  const getProduct = params => {
    axios.post("/api/products/getProducts", params)
      .then(res => {
        if(res.data.success) {
          setProducts(res.data.products)
        }
      })
      .catch(err => console.log(err));
  }

  const handleLoadMore = () => {
    setSkip(skip + limit);
    
    const params = {
      skip: skip + limit,
      limit
    };

    getProduct(params);
  }

  const handleFilter = (flts, category) => {
    console.log(flts);
    const newFilters = {...filters, [category]: flts};
    setFilters(newFilters);
    setSkip(0);
    
    const params = {
      skip: 0,
      limit,
      filters: newFilters
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
        <FilterCheckbox handleFilter={filters => handleFilter(filters, "continents")} /><br/>

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
