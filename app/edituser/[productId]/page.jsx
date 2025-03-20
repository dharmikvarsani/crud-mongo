"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editform from "@/app/components/editform";
import Swal from "sweetalert2";

const EditProduct = () => {
    const params = useParams();
    const router = useRouter();
    const { productId } = params || {};
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/products/${productId}`);
                if (!res.data) {
                    throw new Error("Product not found");
                }
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Product not found");
                Swal.fire({
                    title: "Warning!",
                    text: "Product not found",
                    icon: "warning",
                    confirmButtonText: "OK",
                }).then(() => {
                    router.push("/"); 
                });
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchData();
        } else {
            setError("Product ID is missing");
            setLoading(false);
        }
    }, [productId, router]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loader"></span>
        </div>
    );


    return (
        <div>
            <Editform
                productId={productId}
                name={product?.name || ""}
                price={product?.price || ""}
                color={product?.color || ""}
                description={product?.description || ""}
                category={product?.category || ""}
                stock={product?.stock || ""}
                discount={product?.discount || ""}
            />
        </div>
    );
};

export default EditProduct;
