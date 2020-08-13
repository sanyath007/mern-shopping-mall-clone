import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const TextSearch = props => {
  const [searchText, setSearchText] = useState("");

  const handleChange = e => {
    setSearchText(e.target.value)
    props.refreshFunction(e.target.value)
  };

  return (
    <div>
      <Search 
        onChange={handleChange}
        placeholder="Search By Typing..."
      />
    </div>
  )
}

export default TextSearch
