export interface RequestOptions {
  path: string,
  method: "GET" | "POST" | "DELETE" | "PUT"
  body?: JSONValue,
  headers?: Record<string, string>,
  token?: string
}

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray

interface JSONObject {
  [key: string]: JSONValue;
}

type JSONArray = JSONValue[];