import React, { useEffect, useState } from "react";
import AdminPanel from "../../components/layout/AdminPanel";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);


  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      console.log(name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) {
        productData.append("photo", photo);
      }
      productData.append("category", category);
      const { data } = await axios.put(
        `${API_URL}/api/v1/product/update-product/${id}`,
        productData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        }
      );
    
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Update request failed:", error);
      toast.error("Something went wrong");
    }
  };
  
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${API_URL}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminPanel />
        <div className="w-3/4 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Update Product
          </h1>
          <div className="mb-6 w-3/4">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="mb-4 w-[830px]"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-4">
              <label className="flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-300">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-4">
              {photo? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-48 w-auto mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`${API_URL}/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    className="h-48 w-auto mx-auto"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                value={description}
                placeholder="Write a description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={price}
                placeholder="Write a Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="mb-4"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-4">
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>
              <button
                className="w-full mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
