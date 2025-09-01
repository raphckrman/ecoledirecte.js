import { NetworkError } from "../types/errors";
import { RequestOptions } from "../types/rest";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class RESTManager {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async authRequest<T>(options: RequestOptions): Promise<T> {
    const fullURL = `${this.baseURL}/${options.path}`

    if (options.headers && options.method === "POST" && !options.headers["x-token"]) {
      console.warn("You make a POST request without specifying an identification token, your request risks being blocked by EcoleDirecte")
    }

    const response = await fetch(fullURL, {
      method: options.method,
      body: options.method === "GET" ? JSON.stringify(options.body) : undefined,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...options.headers,
        "User-Agent": "@raphckrman/ecoledirecte.js"
      }
    })

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new NetworkError(response.status, errorMessage)
    }

    const data = response.json();
    return data as T;
  }

  private async get<T>(path: string, params?: Record<string, any>, options?: RequestOptions) {
    const urlParams = new URLSearchParams(params).toString();
    const urlPath = urlParams ? `${path}?${urlParams}` : path;
    return this.authRequest<T>({
      method: "GET",
      path: urlPath,
      headers: options?.headers
    })
  }

  private async post<T>(path: string, params?: Record<string, any>, options?: RequestOptions) {
    const urlParams = new URLSearchParams(params).toString();
    const urlPath = urlParams ? `${path}?${urlParams}` : path;
    return this.authRequest<T>({
      method: "POST",
      path: urlPath,
      body: options?.body,
      headers: options?.headers
    })
  }
}
