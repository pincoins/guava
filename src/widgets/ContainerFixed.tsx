import className from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

const ContainerFixed = ({
  children,
  ...rest
}: { children?: ReactNode } & ComponentPropsWithoutRef<'div'>) => {
  const classes = className(rest.className, 'mx-auto max-w-7xl');

  // 가로 정렬
  // 기본값 - 좌측 정렬
  // 옵션값 - 가운데 정렬 (justify-center)
  // 세로 정렬
  // 기본값 - 상단 정렬 (단, 부모에서 gap-y 값을 줘서 여백 확보된 상태)
  // 옵션값 - 가운데 정렬 (높이 h-full & items-center)
  // 여백
  // 기본값 - 없음
  // 옵션값 - padding

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default ContainerFixed;
