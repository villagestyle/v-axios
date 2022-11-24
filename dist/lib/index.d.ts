import type {
  Axios,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  CancelTokenSource
} from "axios";

type AxiosRequestConfigExtends = AxiosRequestConfig & {
  vConfig?: VConfig;
  cancel?: CancelTokenSource
}

interface AxiosResponseExtends extends AxiosResponse {
  vConfig?: VConfig;
  requestQueue: Map<string, AxiosRequestConfigExtends>;
}

interface VConfig {
  showLoading?: boolean;
  formData?: boolean
}

export type NullAble<T> = T | null;

export declare class VAxios extends Axios {
  private requestQueue: Map<string, AxiosRequestConfigExtends>;
  private instance: NullAble<AxiosInstance>;
  private defaultVConfig: VConfig;

  public requestInterceptors: NullAble<
    (
      config: AxiosRequestConfigExtends
    ) => AxiosRequestConfigExtends | Promise<AxiosRequestConfigExtends>
  >;
  public responseInterceptors: NullAble<
    (responseConfig: AxiosResponseExtends) => Promise<AxiosResponseExtends>
  >;

  constructor(config: AxiosRequestConfigExtends);

  createInstance(config: AxiosRequestConfigExtends): void;

  init(): void;

  vRequest<T = any, R = AxiosResponse<T, any>>(
    config: AxiosRequestConfigExtends
  ): Promise<R>;

  verifyURL(str: string): boolean;

  
  vPost<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfigExtends): Promise<R>;
  vPut<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfigExtends): Promise<R>;
  vGet<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfigExtends): Promise<R>;
  vDelete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfigExtends): Promise<R>;
}
