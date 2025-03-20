"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { signOut, useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession()
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);


  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/products/${_id}`);
          setProducts((prev) => prev.filter((p) => p._id !== _id));
          router.refresh();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(selectedRows.map((id) => axios.delete(`/api/products/${id}`)));
          setProducts((prev) => prev.filter((p) => !selectedRows.includes(p._id)));
          setSelectedRows([]);
          router.refresh();
          Swal.fire("Deleted!", "Selected products have been deleted.", "success");
        } catch (error) {
          console.error("Error deleting products:", error);
        }
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 254 },
    { field: "price", headerName: "Price", width: 145, type: "number" },
    { field: "color", headerName: "Color", width: 100 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "stock", headerName: "Stock", width: 100, type: "number" },
    { field: "discount", headerName: "Discount (%)", width: 100, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      justifyContent: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} className="flex flex-row justify-center items-center" >
          <Link href={`/edituser/${params.row._id}`} passHref>
            <Button variant="contained" color="primary" size="small">
              Edit
            </Button>
          </Link>
          <Button className="h-8" variant="contained" color="error" size="small" onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.row._id);
          }}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-2xl text-center mt-10 mb-4 " >Product List</h1>

      <div className="flex flex-row gap-5 mb-5 justify-center items-center" >
        <Link href="/createproduct" passHref>
          <Button variant="contained" color="success">Create Product</Button>
        </Link>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => signOut()}
        >
          Log-Out
        </Button>
        {/* <p className="text-sm font-semibold">
          {session?.user?.email ? `Login as ${session.user.email}` : "Not Logged In"}
        </p> */}
      </div>

      <Paper sx={{ height: 400, width: "80%", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <DataGrid
          rows={products.map((p) => ({ ...p, id: p._id }))}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default HomePage;
