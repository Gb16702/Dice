"use client"

import { useState } from "react"

export const search = () => {
    const [value, setValue] = useState("");
    const handleChange = e => {
        setValue(e.target.value);
    }
    return handleChange
}