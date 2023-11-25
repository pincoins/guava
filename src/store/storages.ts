// redux-persist 사용 안 함
// 1. 특정 모듈 상태의 특정 속성만 화이트리스트 저장 방법
// - 커스텀 transform 재정의
// - redux-deep-persist 라이브러리 사용
// - redux-persist-transform-filter 라이브러리 사용
// 2. 중요한 상태값은 캐시가 아니라 온라인 백엔드에 저장
// 3. RTK Query fetch 라이브러리 자체적으로 태그로 캐싱 지원

const persistenceKey = 'persist:root';

// 영속 상태 불러와서 슬라이스에서 초기화
export const loadState = () => {
  try {
    const serialized = localStorage.getItem(persistenceKey);

    if (serialized === null) {
      return undefined;
    }

    return JSON.parse(serialized);
  } catch (_) {
    return undefined;
  }
};

// 스토어 상태 변경될 때마다 영속 상태 저장을 위해 스토어에서 구독하는 함수
export const saveState = (state: any) => {
  try {
    const serialized = JSON.stringify(state);

    localStorage.setItem(persistenceKey, serialized);
  } catch (err) {
    console.log(err);
  }
};

export const deleteState = () => {
  localStorage.removeItem(persistenceKey);
};
