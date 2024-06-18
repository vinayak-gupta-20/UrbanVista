import React, { useEffect, useState } from "react";
import AdminPanel from "../../components/layout/AdminPanel";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        `${API_URL}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminPanel />
        <div className="w-3/4 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create Product
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
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
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
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-4">
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
