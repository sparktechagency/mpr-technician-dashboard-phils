export const getBaseUrl = () => {
  return import.meta.env.VITE_PUBLIC_SERVER_URL;
};

export const getImageUrl = () => {
  return import.meta.env.VITE_PUBLIC_IMAGE_URL;
};

export const getSocketApiUrl = () => {
  return import.meta.env.VITE_PUBLIC_SOCKET_API;
};

export const getGoogleMapsApiKey = () => {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
};
