import React, { Fragment, useState } from 'react';
import { Col, Collapse, Radio } from 'antd';

const { Panel } = Collapse;
const priceFilters = [
  { _id: 0, name: 'Any', values: [] },
  { _id: 1, name: '0 - 49', values: [0, 49] },
  { _id: 2, name: '50 - 99', values: [50, 99] },
  { _id: 3, name: '100 - 149', values: [100, 149] },
  { _id: 4, name: '150 - 199', values: [150, 199] },
  { _id: 5, name: 'More than 300', values: [300, 1000] },
]
const FilterRadioBox = props => {
  const [value, setValue] = useState(0);

  const handleToggle = (e) => {
    console.log(e.target);
    setValue(e.target.value);
    props.handleFilter(priceFilters[e.target.value].values)
  }

  return (
    <div>
      <Collapse defaultActiveKey={[0]}>
        <Panel header="Price Range" key={2}>
          <Radio.Group onChange={e => handleToggle(e)} value={value}>
            {priceFilters.map((item, index) => <Radio key={item._id} value={item._id}>{item.name}</Radio> )}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  )
}

export default FilterRadioBox
