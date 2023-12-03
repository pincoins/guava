import { useParams } from 'react-router-dom';

const ProductList = () => {
  const { product } = useParams();

  return <div>{product}</div>;
};

export default ProductList;
