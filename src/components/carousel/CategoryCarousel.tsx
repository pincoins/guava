import { TouchEventHandler, useCallback, useEffect, useState } from 'react';
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
import className from 'classnames';

// 일부러 좌표값은 컴포넌트 밖에 두어서 상태 관리 되지 않음
let touchStartX: number;
let touchEndX: number;

const CategoryCarousel = ({ categories }: { categories: Category[] }) => {
  const CAROUSEL_AUTOPLAY = process.env.CAROUSEL_AUTOPLAY === 'true';
  const CAROUSEL_INTERVAL = parseInt(process.env.CAROUSEL_INTERVAL || '3000');
  const CAROUSEL_TIMEOUT = parseInt(process.env.CAROUSEL_TIMEOUT || '150');
  const CAROUSEL_BLOCK_SIZE = useAppSelector((state: RootState) => state.ui)
    .isMobile
    ? parseInt(process.env.CAROUSEL_BLOCK_SIZE_MOBILE || '4')
    : parseInt(process.env.CAROUSEL_BLOCK_SIZE_DESKTOP || '6');
  const CAROUSEL_SLIDE_SIZE = Math.ceil(
    categories.length / CAROUSEL_BLOCK_SIZE
  );

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentList, setCurrentList] = useState<Category[][]>([]);
  const [carouselAnimation, setCarouselAnimation] = useState<{
    transform: string;
    transition: string;
  }>({
    transform: 'translateX(-100%)',
    transition: `transform ${CAROUSEL_TIMEOUT}ms ease-in-out`,
  });

  const next = useCallback(() => {
    if (currentIndex === CAROUSEL_SLIDE_SIZE) {
      setTimeout(() => {
        setCurrentIndex(1);
        setCarouselAnimation((prev) => {
          return { ...prev, transition: '' };
        });
      }, CAROUSEL_TIMEOUT);
    }

    setCurrentIndex((prev) => {
      return prev + 1;
    });

    setCarouselAnimation((prev) => {
      return {
        ...prev,
        transition: `transform ${CAROUSEL_TIMEOUT}ms ease-in-out`,
      };
    });
  }, [CAROUSEL_SLIDE_SIZE, currentIndex]);

  const moveToNthSlide = (index: number) => {
    // 트랜지션이 일어나기 기다렸다가 종료되면 바로 트랜지션 없애고 실제 슬라이드로 바로 이동
    setTimeout(() => {
      setCurrentIndex(index);

      setCarouselAnimation((prev) => {
        return { ...prev, transition: '' };
      });
    }, CAROUSEL_TIMEOUT);
  };

  useEffect(() => {
    const slides = [];

    if (categories.length !== 0 && CAROUSEL_SLIDE_SIZE !== 0) {
      for (let i = 0; i < CAROUSEL_SLIDE_SIZE; i++) {
        slides.push(
          categories.slice(
            i * CAROUSEL_BLOCK_SIZE,
            (i + 1) * CAROUSEL_BLOCK_SIZE
          )
        );
      }
      // 컴포넌트 렌더링 시점에 넘겨 받은 카테고리로 새 리스트를 구성
      // 첫 레코드 앞에 끝 레코드, 끝 레코드 앞에 첫 레코드 삽입하여 자연스러운 순환 가능
      setCurrentList([slides[CAROUSEL_SLIDE_SIZE - 1], ...slides, slides[0]]);

      if (!CAROUSEL_AUTOPLAY) return;
      const interval = setInterval(next, CAROUSEL_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [
    categories,
    CAROUSEL_BLOCK_SIZE,
    CAROUSEL_SLIDE_SIZE,
    CAROUSEL_AUTOPLAY,
    CAROUSEL_INTERVAL,
    next,
  ]);

  useEffect(() => {
    setCarouselAnimation((prev) => {
      return { ...prev, transform: `translateX(-${currentIndex * 100}%)` };
    });
  }, [currentIndex]);

  const handleMove = (direction: number) => {
    const newIndex = currentIndex + direction; // +1: next / -1: prev

    if (newIndex === CAROUSEL_SLIDE_SIZE + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(CAROUSEL_SLIDE_SIZE);
    }

    setCurrentIndex((prev) => prev + direction);

    setCarouselAnimation((prev) => {
      return {
        ...prev,
        transform: `transform ${CAROUSEL_TIMEOUT}ms ease-in-out`,
      };
    });
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX >= touchEndX) {
      handleMove(1);
    } else {
      handleMove(-1);
    }
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const currentTouchX = e.nativeEvent.changedTouches[0].clientX;

    setCarouselAnimation((prev) => {
      return {
        ...prev,
        transform: `translateX(calc(-${currentIndex}00% - ${
          (touchStartX - currentTouchX) * 2 || 0
        }px))`,
      };
    });
  };

  return (
    <>
      <div className="overflow-hidden">
        <div
          className={'flex'}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={carouselAnimation}
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
          {Array.from({ length: CAROUSEL_SLIDE_SIZE }, (_, i) => i + 1).map(
            (_, index) => {
              return (
                <Button
                  type="button"
                  onClick={() => moveToNthSlide(index + 1)}
                  className={className('items-center', {
                    'text-[#1d915c]': currentIndex === index + 1,
                    'text-[#ebf2ea]': currentIndex !== index + 1,
                  })}
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
