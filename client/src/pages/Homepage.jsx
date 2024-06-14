import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';

const Homepage = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch initial products and categories on component mount
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  // Fetch products based on page number
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if(page===1) return;
    loadMore();
  }, [page])
  

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Filter products based on checked categories and radio selection
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/product/product-filters', {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log("Hello");
    }
  };

  // useEffect to trigger product fetch on category or radio change
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // useEffect to trigger filtering when checked or radio change
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title="All Products - Best offers">
      <div className="container mx-8 mt-3">
        <div className="flex">
          {/* Filter Column */}
          <div className="w-1/4 px-4 bg-[#f5f3ee]">
            <h4 className="text-center mb-4">Filter By Category</h4>
            <div className="flex flex-col">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="flex flex-col">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="flex flex-col mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          {/* Product Display Column */}
          <div className="w-3/4 px-4 grid grid-cols-3 gap-4">
            {products?.map((p) => (
              <div className="card p-4 border rounded-lg" key={p._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top object-cover h-48"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {p.price}</p>
                  <div className="flex justify-between">
                    <button onClick={() => navigate(`/product/${p.slug}`)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2">
                      More Details
                    </button>
                    <button 
                      onClick={() => {
                        setCart([...cart,p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast.success("Item added to cart");
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 flex justify-center">
          {products && products.length < total && (
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
              onClick={() => setPage(page + 1)}
            >
              {loading ? 'Loading ...' : 'Load more'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
