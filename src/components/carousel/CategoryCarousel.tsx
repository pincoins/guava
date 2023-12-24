import { useEffect, useState } from 'react';
import { Category } from '../../types';
import { Link } from 'react-router-dom';
import { MdArrowDownward } from 'react-icons/md';
import Button from '../../widgets/Button';

const CategoryCarousel = ({ categories }: { categories: Category[] }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentList, setCurrentList] = useState(categories);

  useEffect(() => {
    // 컴포넌트 렌더링 시점에 넘겨 받은 카테고리로 새 리스트를 구성
    // 첫 레코드 앞에 끝 레코드, 끝 레코드 앞에 첫 레코드 삽입하여 자연스러운 순환 가능
    if (categories.length !== 0) {
      const start = categories[0];
      const end = categories[categories.length - 1];
      const newList = [end, ...categories, start];

      setCurrentList(newList);
    }
  }, [categories]);

  useEffect(() => {
    // TODO: 애니메이션 효과: x축 이동
  }, [currentIndex]);

  const moveToNthSlide = (index: number) => {
    // 트랜지션이 일어나기 기다렸다가 종료되면 바로 트랜지션 없애고 실제 슬라이드로 바로 이동
    setTimeout(() => {
      setCurrentIndex(index);

      // TODO: 애니메이션 효과: ease-in-out 트랜지션 없애기
    }, 500);
  };

  const handleMove = (direction: number) => {
    const newIndex = currentIndex + direction; // +1: next / -1: prev

    if (newIndex === categories.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(categories.length);
    }

    setCurrentIndex((prev) => prev + direction);

    // TODO: 애니메이션 효과: ease-in-out 트랜지션 주기
  };

  console.log(currentList);

  return (
    <>
      <div className="overflow-hidden">
        <div
          className={'flex'}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {currentList.map((category, index) => (
            <div
              className="min-w-full shrink-0"
              key={`${category.slug}_${index}`}
            >
              <div className="h-[105px] w-[168px] sm:h-[116px] sm:w-[186px] rounded-lg">
                <Link to={`shop/products/${category.slug}`}>
                  <img
                    src={
                      category.image && category.image.trim().length > 0
                        ? category.image
                        : 'https://placehold.co/468x300/orange/white'
                    }
                    alt={category.title}
                    className="h-full w-full object-fill object-center rounded-lg border border-black"
                  />
                </Link>
              </div>
              <h3 className="font-bold text-gray-900 text-center">
                {category.title}
              </h3>
              <p className=" flex gap-x-2 text-sm font-semibold justify-center">
                최대
                <span className="inline-flex font-bold items-center text-red-600">
                  {category.discountRate}% <MdArrowDownward />
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={() => handleMove(-1)}>L</Button>
        <Button onClick={() => handleMove(1)}>R</Button>
      </div>
    </>
  );
};

export default CategoryCarousel;
