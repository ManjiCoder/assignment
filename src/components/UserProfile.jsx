import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../utils/apiServices';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner';
import PaginationButtons from './PaginationButtons';

const UserProfile = () => {
  const { search } = useLocation();

  // based on url search params page will set
  const page = search.includes('=') ? parseInt(search.split('=').pop()) : 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users' + page],
    queryFn: () => fetchData(page),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const { results, info } = data;
  const user = results[0];

  return (
    <main className="container grid gap-4 justify-center mx-auto mt-8">
      <h1 className="text-xl text-center">Page - {info.page}</h1>
      {user && (
        <section className="max-w-md md:max-w-lg md:flex items-center bg-white shadow-lg rounded-md overflow-hidden">
          <img
            className="w-full h-56 object-cover"
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
          />
          <section className="p-6">
            <div className="flex items-center space-x-3 justify-center">
              <h2 className="text-xl font-medium capitalize text-gray-800">{`${user.name.first} ${user.name.last}`}</h2>
            </div>
            <h5 className="text-gray-600 text-center text-sm mt-2">
              {user.email}
            </h5>
            <div className="mt-4 flex flex-col items-center">
              <div className="mr-4">
                <h3 className="text-gray-800 capitalize">
                  <b className="font-medium mr-1">Gender:-</b> {user.gender}
                </h3>
              </div>
              <div>
                <h3 className="text-gray-800">
                  <b className="font-medium mr-1">Phone:-</b>
                  {user.phone}
                </h3>
              </div>
            </div>
          </section>
        </section>
      )}
      <PaginationButtons page={page} />
    </main>
  );
};

export default UserProfile;
