import { useParams } from 'react-router-dom';

const CategoryList = () => {
  const { category } = useParams();

  return <div>{category}</div>;
};

export default CategoryList;
