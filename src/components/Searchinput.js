import React, { useState } from 'react';
import useDebounce from './useDebounce';

const Searchinput = ({ value, onChange }) =>{
    const [displayValue,setDisplayValue] = useState(value)
    const debouncedChange = useDebounce(onChange, 1000);

    function handleChange(event){
        setDisplayValue(event.target.value);
        debouncedChange(event.target.value);
    }

    return (
        <input type="search" value={displayValue} onChange={handleChange} placeholder='Buscar anime...' />
    )
};

export default Searchinput;