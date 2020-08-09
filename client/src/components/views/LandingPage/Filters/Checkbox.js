import React, { Fragment, useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;
const continents = [
  { _id: 1, name: 'ภาคกลาง' },
  { _id: 2, name: 'ภาคเหนือ' },
  { _id: 3, name: 'ภาคอีสาน' },
  { _id: 4, name: 'ภาคตะวันออก' },
  { _id: 5, name: 'ภาคตะวันตก' },
  { _id: 6, name: 'ภาคใต้' },
  { _id: 7, name: 'กรุงเทพและปริมณฑล' },
];

const FilterCheckbox = props => {
  const [checked, setChecked] = useState([]);

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if(currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilter(newChecked);
  };

  return (
    <div>
      <Collapse defaultActiveKey={[0]}>
        <Panel key={1}>
          {continents.map((item, index) => (
            <Fragment key={item._id}>
              <Checkbox
                onChange={() => handleToggle(item._id)}
                type="checkbox"
                checked={checked.indexOf(item._id) === -1 ? false : true}
              />
              <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>{item.name}</span>
            </Fragment>
          ))}
        </Panel>
      </Collapse>
    </div>
  )
}

export default FilterCheckbox;
