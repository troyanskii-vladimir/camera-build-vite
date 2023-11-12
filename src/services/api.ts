import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../config';


type DetailMessageType = {
  type: string;
  message: string;
}


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        const detailMessage = (error.response.data);

        //Сервер на все ошибки выдает пустое тело ответа, поэтому вывожу стандартные текст
        toast.warn(`${detailMessage?.type}, Ошибка получения данных`);
      }

      throw error;
    },
  );

  return api;
};
