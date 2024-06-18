import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}