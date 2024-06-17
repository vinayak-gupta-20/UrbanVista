import React, { useEffect, useState } from "react";
import AdminPanel from "../../components/layout/AdminPanel";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
    const[products,setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const {data} = await axios.get("http://localhost:8080/api/v1/product/get-product");
            setProducts(data.products);
            console.log(products.length);
            console.log(products);
        } catch (error) {
            console.log(error);
            toast.error("cannot get products");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    

  return (
    <Layout>
        <div className="flex">
            <AdminPanel />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.map((p) => (
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="flex flex-col h-96    items-center justify-center bg-white p-2 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                            className="h-40 object-cover mb-4"
                            alt={p.name}
                        />
                        <div className="text-center">
                            <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                            <p className="text-sm text-gray-600">{p.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Products