import React, { Suspense } from 'react';

const Profile = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>profile</div>
    </Suspense>
  );
};

export default Profile;
