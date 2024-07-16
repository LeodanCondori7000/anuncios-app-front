import { useState } from "react";
import { useAdsStore } from "../app/zustandStore";
import { useUserStore } from "../app/zustandStore";
import styled from "styled-components";

const AdContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  max-width: 8rem;
`;

const Ad = ({ ad }) => {
  const { categories, updateAd, deleteAd } = useAdsStore();
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(ad.body);

  const handleEdit = () => {
    if(!user) return;
    if(user.id !== ad.userId) return;
    setIsEditing(true);
  };

  const handleDelete = () => {
    if(!user) return;
    if(user.id !== ad.userId) return;
    deleteAd(ad.id);
  };

  const handleUpdate = () => {
    updateAd(ad.id, {
      body: content,
      categoryId: ad.categoryId,
      userId: ad.userId,
    });
    setIsEditing(false);
  };

  return (
    <AdContainer>
      {!isEditing ? (
        <div>
          <span>
            {categories.find((category) => category.id === ad.categoryId)?.name}
          </span>
          <p>{ad.body}</p>
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="escribir..."
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </AdContainer>
  );
};

export default Ad;
