import React, { useState,useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react"
import axios from "axios";


const CartPage = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken,setClientToken] = useState("");
  const [instance,setInstance] = useState("");
  const [loading,setLoading] = useState(false);

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold bg-gray-200 p-4 rounded">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-xl">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : "Your Cart Is Empty"}
          </h4>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-2/3 px-4">
            {cart?.map((p) => (
              <div
                key={p._id}
                className="flex mb-4 p-4 bg-white rounded shadow-md"
              >
                <div className="w-1/4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="w-3/4 pl-4">
                  <p className="text-lg font-semibold">{p.name}</p>
                  <p className="text-gray-700">{p.description.substring(0, 30)}</p>
                  <p className="text-gray-900 font-bold">Price: {p.price}</p>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3 px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
            <p className="text-gray-700">Total | Checkout | Payment</p>
            <hr className="my-4" />
            <h4 className="text-xl font-bold mb-4">Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Current Address</h4>
                  <p className="text-gray-700">{auth?.user?.address}</p>
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded mt-2 hover:bg-yellow-600"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-4">
                {auth?.token ? (
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="rounded-md bg-blue-500 h-12 text-white px-2"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
