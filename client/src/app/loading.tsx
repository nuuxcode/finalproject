'use client'

import CirclePopLoader from 'react-loaders-kit/lib/circlePop/CirclePopLoader'

const Loading = () => {
  return (
    <div className='min-h-screen w-100 grid place-content-center'>
      <CirclePopLoader
        loading={true}
        size={200}
        color="#FFCA28"
      />
    </div>
  );
};
export default Loading;