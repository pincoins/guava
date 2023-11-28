import { Suspense } from 'react';
import Skeleton from '../../widgets/Skeleton';
import ContainerFixed from '../../widgets/ContainerFixed';
import Panel from '../../widgets/Panel';

const Profile = () => {
  return (
    <ContainerFixed className="flex p-2 md:p-0 md:justify-center">
      <Suspense fallback={<Skeleton className="h-10 w-full" times={3} />}>
        <Panel shadow rounded>
          profile
        </Panel>
      </Suspense>
    </ContainerFixed>
  );
};

export default Profile;
