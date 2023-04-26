"use client";

import {useState} from "react"


const Select = ({options, placeholder, className}) => {
    const [selectedValue, setSelectedValue] = useState("");

    return  <select value={selectedValue} onChange = {(event) => setSelectedValue(event.target.value)} className={className}>
                <option value = "" disabled hidden>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
}
export default Select;