import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-6">
        <h4 className="text-center text-2xl font-semibold mb-4">Category - {category?.name}</h4>
        <h6 className="text-center text-lg mb-6">{products?.length} result{products?.length !== 1 ? 's' : ''} found </h6>
        <div className="flex flex-wrap mx-5">
          {products?.map((p) => (
            <div
              className="max-w-sm w-64 bg-white rounded-lg shadow-md overflow-hidden m-4"
              key={p._id}
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{p.name}</h5>
                <p className="text-gray-700 mb-2">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="text-gray-900 font-bold mb-4">$ {p.price}</p>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-500 h-12 w-24 text-white py-1 px-4 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="bg-green-500 text-sm text-white py-1 px-4 rounded hover:bg-green-600 h-12 w-24">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
