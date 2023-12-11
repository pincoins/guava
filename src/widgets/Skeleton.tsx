import classNames from 'classnames';

const Skeleton = ({
  times,
  className,
}: {
  times: number;
  className: string;
}) => {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    className
  );

  const innerClassNames = classNames(
    // tailwind.config.ts 파일에 설정 있음
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );

  return Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });
};

export default Skeleton;
