import axios from 'axios';

const useRaindropApi = () => {
  const config = useRuntimeConfig();
  
  const api = axios.create({
    baseURL: 'https://api.raindrop.io/rest/v1',
    headers: {
      Authorization: `Bearer ${config.public.raindropApiToken}`,
    },
  });

  const fetchCollections = async () => {
    const response = await api.get('/collections');
    return response.data.items;
  };

  const fetchBookmarks = async (collectionId = 0) => {
    const response = await api.get(`/raindrops/${collectionId}`);
    return response.data.items;
  };

  return {
    fetchCollections,
    fetchBookmarks
  };
};

export default useRaindropApi;
