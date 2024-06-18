import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
import AdminPanel from "../../components/layout/AdminPanel";

const Orders = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminPanel />
        <div className="w-full md:w-9/12 p-4">
          <h1 className="text-center text-2xl font-bold mb-4">All Orders</h1>
          {orders?.map((o, i) => (
            <div key={o._id} className="border rounded-lg shadow mb-4 p-4">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">#</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Buyer</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Payment</th>
                    <th className="px-4 py-2 border">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">{i + 1}</td>
                    <td className="px-4 py-2 border">
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                        className="w-full"
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="px-4 py-2 border">{o?.buyer?.name}</td>
                    <td className="px-4 py-2 border">{moment(o?.createdAt).fromNow()}</td>
                    <td className="px-4 py-2 border">{o?.payment.success ? "Success" : "Failed"}</td>
                    <td className="px-4 py-2 border">{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                {o?.products?.map((p) => (
                  <div key={p._id} className="flex mb-4 p-4 border rounded-lg">
                    <div className="w-1/4">
                      <img
                        src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    <div className="w-3/4 pl-4">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm">{p.description.substring(0, 30)}...</p>
                      <p className="text-sm font-semibold">Price: Rs.{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
