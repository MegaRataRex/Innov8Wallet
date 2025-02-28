import axios, {AxiosInstance} from 'axios';
import {HttpAdapter} from './http_adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Options {
  baseUrl: string;
  params: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }


  async get<T>(
    url: string,
    options?: Record<string, unknown> | undefined,
  ): Promise<T> {
    try {
      const {data} = await this.axiosInstance.get(url, options);

      return data;
    } catch (error) {
      throw new Error(`Error fetching get: ${url}`);
    }
  }


  async post<T>(url: string, body: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstance.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`Error fetching post: ${url}`);
    }
  }
}
