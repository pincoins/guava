import { Category } from '../../../store/models/interfaces';
import { useFetchCategoriesQuery } from '../../../store/services/categoryApi';

const CategoryList = () => {
  const { data, error, isLoading } = useFetchCategoriesQuery();

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>error occurred.</div>;
  } else {
    content = data?.map((i: Category) => {
      return <div key={i.slug}>{i.title}</div>;
    });
  }

  return <div>{content}</div>;
};

export default CategoryList;
