import { useEffect, useState } from 'react';
import { Category } from '../../types';
import { Link } from 'react-router-dom';
import {
  MdArrowDownward,
  MdArrowLeft,
  MdArrowRight,
  MdCircle,
} from 'react-icons/md';
import Button from '../../widgets/Button';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';

const CategoryCarousel = ({ categories }: { categories: Category[] }) => {
  const { isMobile } = useAppSelector((state: RootState) => state.ui);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentList, setCurrentList] = useState<Category[][]>([]);
  const [carouselTransform, setCarouselTransform] =
    useState('translateX(-100%)');
  const [carouselTransition, setCarouselTransition] = useState(
    'transform 150ms ease-in-out'
  );

  const AUTO_PLAY = true;
  const INTERVAL_LENGTH = 2000;
  const BLOCK_SIZE = isMobile ? 4 : 6;
  const NUMBER_OF_SLIDES = Math.ceil(categories.length / BLOCK_SIZE);

  useEffect(() => {
    const slides = [];

    if (categories.length !== 0 && NUMBER_OF_SLIDES !== 0) {
      for (let i = 0; i < NUMBER_OF_SLIDES; i++) {
        slides.push(categories.slice(i * BLOCK_SIZE, (i + 1) * BLOCK_SIZE));
      }
      // 컴포넌트 렌더링 시점에 넘겨 받은 카테고리로 새 리스트를 구성
      // 첫 레코드 앞에 끝 레코드, 끝 레코드 앞에 첫 레코드 삽입하여 자연스러운 순환 가능
      setCurrentList([slides[NUMBER_OF_SLIDES - 1], ...slides, slides[0]]);

      if (!AUTO_PLAY) return;
      const interval = setInterval(next, INTERVAL_LENGTH);
      return () => clearInterval(interval);
    }
  }, [categories, BLOCK_SIZE, NUMBER_OF_SLIDES, AUTO_PLAY]);

  useEffect(() => {
    setCarouselTransform(`translateX(-${currentIndex * 100}%)`); // 애니메이션 효과: x축 이동
  }, [currentIndex]);

  const moveToNthSlide = (index: number) => {
    // 트랜지션이 일어나기 기다렸다가 종료되면 바로 트랜지션 없애고 실제 슬라이드로 바로 이동
    setTimeout(() => {
      setCurrentIndex(index);

      setCarouselTransition(''); // 애니메이션 효과: ease-in-out 트랜지션 없애기
    }, 150);
  };

  const handleMove = (direction: number) => {
    const newIndex = currentIndex + direction; // +1: next / -1: prev

    if (newIndex === NUMBER_OF_SLIDES + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(NUMBER_OF_SLIDES);
    }

    setCurrentIndex((prev) => prev + direction);

    setCarouselTransition('transform 150ms ease-in-out'); // 애니메이션 효과: ease-in-out 트랜지션 설정
  };

  const next = () => {
    if (currentIndex + 1 === NUMBER_OF_SLIDES + 1) {
      setTimeout(() => {
        setCurrentIndex(1);

        setCarouselTransition(''); // 애니메이션 효과: ease-in-out 트랜지션 없애기
      }, 150);
    }

    setCurrentIndex((prev) => {
      if (prev === NUMBER_OF_SLIDES) {
        return 1;
      }
      return prev + 1;
    });

    setCarouselTransition('transform 150ms ease-in-out'); // 애니메이션 효과: ease-in-out 트랜지션 설정
  };

  return (
    <>
      <div className="overflow-hidden">
        <div
          className={'flex'}
          style={{
            transform: carouselTransform,
            transition: carouselTransition,
          }}
        >
          {currentList.map((slide, index) => {
            return (
              <div className="min-w-full shrink-0" key={index}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-6 sm:gap-x-8 sm:gap-y-8">
                  {slide.map((category) => {
                    return (
                      <div
                        className="grid grid-cols-1 gap-y-1"
                        key={category.slug}
                      >
                        <div className="h-[105px] sm:h-[116px] w-full overflow-hidden rounded-lg">
                          <Link to={`shop/products/${category.slug}`}>
                            <img
                              src={
                                category.image &&
                                category.image.trim().length > 0
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <Button onClick={() => handleMove(-1)} rounded="full">
          <MdArrowLeft />
        </Button>
        <div className="flex gap-x-1">
          {Array.from({ length: NUMBER_OF_SLIDES }, (_, i) => i + 1).map(
            (_, index) => {
              return (
                <Button
                  type="button"
                  onClick={() => moveToNthSlide(index + 1)}
                  className={
                    currentIndex === index + 1
                      ? 'text-[#1d915c]'
                      : 'text-[#ebf2ea]'
                  }
                  flat
                  key={index}
                >
                  <MdCircle />
                </Button>
              );
            }
          )}
        </div>
        <Button onClick={() => handleMove(1)} rounded="full">
          <MdArrowRight />
        </Button>
      </div>
    </>
  );
};

export default CategoryCarousel;
