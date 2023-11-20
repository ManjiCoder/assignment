import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import Spinner from './Spinner';

const UserProfile = () => {
  const [page, setPage] = useState(1);

  const fetchData = async (pageNo) => {
    try {
      const { data } = await axios.get(
        `https://randomuser.me/api/?page=${pageNo}&results=1&seed=abc`
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

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
  // console.log({ user, info });

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
          <div className="p-6">
            <div className="flex items-center space-x-3 justify-center">
              <div className="text-xl font-medium capitalize text-gray-800">{`${user.name.first} ${user.name.last}`}</div>
            </div>
            <p className="text-gray-600 text-center text-sm mt-2">
              {user.email}
            </p>
            <div className="mt-4 flex flex-col items-center">
              <div className="mr-4">
                <p className="text-gray-800 capitalize">
                  <b className="font-medium mr-1">Gender:-</b> {user.gender}
                </p>
              </div>
              <div>
                <p className="text-gray-800">
                  <b className="font-medium mr-1">Phone:-</b>
                  {user.phone}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="max-w-md md:max-w-lg flex justify-between gap-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => old - 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Previous Page
        </button>
        <button
          onClick={() => setPage((old) => old + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next Page
        </button>
      </section>
    </main>
  );
};

export default UserProfile;
