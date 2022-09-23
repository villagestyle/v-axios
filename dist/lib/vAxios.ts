import axios, { Axios, AxiosInstance, AxiosResponse } from "axios";
import qs from "qs";
import {
  AxiosRequestConfigExtends,
  AxiosResponseExtends,
  NullAble,
  VConfig
} from "./index";

export class VAxios extends Axios {
  private requestQueue: Map<string, AxiosRequestConfigExtends> = new Map();
  public requestInterceptors: NullAble<
    (
      config: AxiosRequestConfigExtends
    ) => AxiosRequestConfigExtends | Promise<AxiosRequestConfigExtends>
  > = null;

  public responseInterceptors: NullAble<
    (responseConfig: AxiosResponseExtends) => Promise<AxiosResponseExtends>
  > = null;

  private instance: NullAble<AxiosInstance> = null;
  private defaultVConfig: VConfig = { showLoading: false };

  constructor(config?: AxiosRequestConfigExtends) {
    super();
    config?.vConfig && (this.defaultVConfig = config?.vConfig);
    this.createInstance(config);
  }

  createInstance(config?: AxiosRequestConfigExtends) {
    this.instance = axios.create(config);
    this.init();
  }

  init() {
    this.instance!.interceptors.request.use(config => {
      if (this.requestInterceptors && this.verifyURL(config.url)) {
        const extendsConfig = this.requestQueue.get(config.url);

        if (extendsConfig) return this.requestInterceptors(extendsConfig);

        return this.requestInterceptors(config);
      }
      return config;
    });

    this.instance!.interceptors.response.use(async responseConfig => {
      const url = responseConfig.config.url;
      if (this.responseInterceptors && url) {
        const extendsConfig = this.requestQueue.get(url);
        this.requestQueue.delete(url);

        return await this.responseInterceptors({
          ...responseConfig,
          vConfig: extendsConfig?.vConfig,
          requestQueue: this.requestQueue
        });
      }
      return responseConfig;
    });
  }

  vRequest<T = any, R = AxiosResponse<T, any>>(
    config: AxiosRequestConfigExtends
  ): Promise<R> {
    if (this.verifyURL(config.url)) {
      const VConfig = config.vConfig || this.defaultVConfig;
      this.requestQueue.set(config.url, {
        ...config,
        vConfig: VConfig
      });
      /** formData情况 */
      if (VConfig?.formData) {
        config.data = qs.stringify(config.data);
      }
      delete config.vConfig;
      const request = this.instance?.request<T, R>({
        url: config.baseURL ? config.baseURL + config.url : config.url,
        ...config
      });

      return request ? request : Promise.reject();
    } else {
      return Promise.reject();
    }
  }

  vGet<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfigExtends): Promise<R> {
    return this.vRequest({
      url,
      method: 'get',
      ...config
    })
  }

  vPost<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfigExtends): Promise<R> {
    return this.vRequest({
      url,
      method: "post",
      data,
      ...config
    })
  }

  vPut<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfigExtends): Promise<R> {
    return this.vRequest({
      url,
      method: "put",
      data,
      ...config
    })
  }

  vDelete<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfigExtends): Promise<R> {
    return this.vRequest({
      url,
      method: "delete",
      data,
      ...config
    })
  }

  verifyURL(url: unknown): url is string {
    return typeof url === "string";
  }
}
