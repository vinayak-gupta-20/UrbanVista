import React from "react";
import Layout from "../../components/layout/Layout";
import { useSearch } from "../../context/Search";

const SearchPage = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const [values] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Search Results</h1>
          <h6 className="text-lg mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div key={p._id} className="m-2 w-72 border rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold">{p.name}</h5>
                  <p className="text-gray-600 mt-2">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="text-gray-800 mt-2"> $ {p.price}</p>
                  <button className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    More Details
                  </button>
                  <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
