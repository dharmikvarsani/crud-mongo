"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";

const Editform = ({ productId, name, color, price, description, category, stock, discount }) => {
    const [newName, setNewName] = useState(name);
    const [newColor, setNewColor] = useState(color);
    const [newPrice, setNewPrice] = useState(price);
    const [newDescription, setNewDescription] = useState(description)
    const [newCategory, setNewCategory] = useState(category)
    const [newStock, setNewStock] = useState(stock)
    const [newDiscount, setNewDiscount] = useState(discount)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/products/${productId}`, {
                name: newName,
                color: newColor,
                price: newPrice,
                description: newDescription,
                category: newCategory,
                stock: newStock,
                discount: newDiscount,
            });
            Swal.fire({
                title: "Success!",
                text: "Product updated successfully!",
                icon: "success",
            }).then(() => {
                router.push("/");
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to update product.",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-5 mb-4 ">Edit Product</h1>
            <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: "30ch" } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required />
                <TextField
                    label="Price"
                    variant="outlined"
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                />
                <TextField
                    label="Color"
                    variant="outlined"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        value={newCategory}
                        label="Category"
                        onChange={(e) => setNewCategory(e.target.value)}
                    >
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Accessories">Accessories</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Stock"
                    variant="outlined"
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    required
                />
                <TextField
                    label="Discount"
                    variant="outlined"
                    type="number"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">Update Product</Button>
            </Box>
        </div>
    );
};

export default Editform;
