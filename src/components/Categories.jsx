import { useEffect } from "react";
import { useAdsStore } from "../app/zustandStore";

const Categories = () => {
  const { categories, fetchCategories } = useAdsStore((state) => state);

  const { filterInAds } = useAdsStore((state) => ({
    filterInAds: state.filterInAds,
  }));

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <button onClick={() => filterInAds(category.id)}>{category.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
