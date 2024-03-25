import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [categoryIsLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState();
  const [empty, setEmpty] = useState<boolean>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ALLcategory/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        !data.length ? setEmpty(true) : setCategory(data);
        setCategoryLoading(false);
      } catch (error) {
        setCategoryError(error.message);
        setCategoryLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Sub categories</h2>
        <hr />
        <div className="categories">
          {empty && <h1>its not a sub category ..</h1>}
          {category.map((column) => (
            <a href={`/subCategory/${column.category_id}`} className="category-section">
              <div className="category-image-label">
                <img src={`data:image/png;base64,${column.image}`} alt="" />
              </div>
              <div className="text-section">
                <p>
                  <strong>{column.name}</strong>
                </p>
                <span>{column.description}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
