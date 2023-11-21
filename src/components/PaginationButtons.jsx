import { useNavigate } from 'react-router-dom';

export default function PaginationButtons({ page }) {
  const navigate = useNavigate();

  return (
    <section className="max-w-md md:max-w-lg flex justify-between gap-x-4">
      <button
        disabled={page === 1}
        onClick={() => navigate(`?page=${page - 1}`)}
        className="disabled:cursor-not-allowed bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Previous Page
      </button>
      <button
        onClick={() => navigate(`?page=${page + 1}`)}
        className="disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Next Page
      </button>
    </section>
  );
}
