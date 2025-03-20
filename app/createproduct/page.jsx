"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [discount, setDiscount] = useState("");
    // const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name,
            price: Number(price),
            color,
            description,
            category,
            stock: Number(stock),
            discount: Number(discount),
        };

        try {
            const res = await axios.post("/api/products", productData, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 201) {
                Swal.fire({
                    title: "Success!",
                    text: "Product created successfully!",
                    icon: "success",
                }).then(() => {
                    router.push("/");
                });

                setName("");
                setPrice("");
                setColor("");
                setDescription("");
                setCategory("");
                setStock("");
                setDiscount("");
            }
        } catch (error) {
            console.error("Error in Creating Product:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to create product. Please try again.",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-5 mb-4 " >Create Product</h1>
            {/* {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} */}
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
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <TextField
                    label="Color"
                    variant="outlined"
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value='Electronics'>Electronics</MenuItem>
                        <MenuItem value='Clothing'>Clothing</MenuItem>
                        <MenuItem value='Accessories'>Accessories</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Stock"
                    variant="outlined"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required />
                <TextField
                    label="Discount"
                    variant="outlined"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </div>
    );
};

export default CreateProduct;
