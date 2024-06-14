import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <div className="flex justify-evenly md:flex-row md:space-x-8 mx-10 ">
          <div className="">
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className=" w-80 object-cover"
            />
          </div>
          <div className="mt-6 md:mt-4">
            <h1 className="text-2xl font-bold text-center md:text-left">Product Details</h1>
            <div className="mt-4">
              <h6 className="text-lg">Name: {product.name}</h6>
              <h6 className="text-lg">Description: {product.description}</h6>
              <h6 className="text-lg">Price: ${product.price}</h6>
              <h6 className="text-lg">Category: {product?.category?.name}</h6>
              <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <div>
          <h6 className="text-xl font-bold mx-10">Similar Products</h6>
          {relatedProducts.length < 1 ? (
            <p className="text-center mt-4">No Similar Products found</p>
          ) : (
            <div className="flex flex-wrap mt-4 mx-10">
              {relatedProducts.map((p) => (
                <div key={p._id} className="m-2 w-72 border rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="text-xl font-semibold">{p.name}</h5>
                    <p className="text-gray-600 mt-2">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="text-gray-800 mt-2">$ {p.price}</p>
                    <button
                      className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
