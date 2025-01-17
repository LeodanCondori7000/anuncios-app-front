import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdsStore, useUserStore } from "../app/zustandStore";
import styled from "styled-components";

const StyledPublish = styled.div`
  background-color: #007bff;
  font-weight: bold;
  font-size: 1rem;
  /* height: 6rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: yellow;
`;

const PublishButton = styled.div`
  /* background-color: #007bff; */
  /* font-weight: bold;
  font-size: 1rem; */
  
  display: flex;
  justify-content: center;
  align-items: center;
  .publish{
    color: #007bff;
    font-weight: bold;
    font-size: 1rem;
    background-color: #F5F5F5;
    border: #007bff 1px solid;
    border-radius: 20px;
    padding: 0rem 1rem;
  }
  
`;

const Publish = () => {
  const { categories, createAd } = useAdsStore();
  const { user } = useUserStore();

  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const categoryId = category || 1;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = () => {
    const ad = {
      body: content,
      categoryId,
      userId: user.id,
    };
    console.log("category:", category);
    console.log("content:", content);
    setIsEditing(false);
    setCategory("");
    setContent("");
    createAd(ad);
  };

  const navigateToLogin = () => {
    // window.location.href = "/login";
    navigate("/login");
  };

  if (!user) {
    return (
      <PublishButton>
        <button className="publish" onClick={() => navigateToLogin()}>¿Publicar Anuncio?</button>
      </PublishButton>
    );
  }
  return (
    <StyledPublish>
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>¿Publicar Anuncio?</button>
      ) : (
        <div>
          <textarea
            type="text"
            placeholder="escribir..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            // onBlur={() => setIsEditing(false)}
          />
          <br />
          <select value={category} onChange={handleCategoryChange}>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <br />
          <button onClick={handleSubmit}>publicar</button>
        </div>
      )}
    </StyledPublish>
  );
};

export default Publish;

// {isEditing && user && (

// )}
// {!isEditing && !user(

// )}
// {!isEditing && (
//   <button onClick={() => setIsEditing(true)}>¿publicar anuncio?</button>
// )}
