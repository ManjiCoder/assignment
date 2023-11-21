import axios from 'axios';

export const fetchData = async (pageNo) => {
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
