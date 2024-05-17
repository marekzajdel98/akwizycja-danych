import axios, { AxiosRequestConfig } from "axios";

const ERROR_MSG = "Problem occured while trying to fetch data from the server.";

const httpClient = axios.create({
  baseURL: "http://localhost:8000",
});
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

async function apiRequest(
  url: string,
  config?: AxiosRequestConfig,
  type: "GET" | "POST" | "DELETE" = "GET",
  postData = {}
): Promise<ApiResponse> {
  let res = { status: 200, data: null, message: ERROR_MSG };
  try {
    if (type === "GET") {
      res = await httpClient.get(url, config);
    } else if (type === "DELETE") {
      res = await httpClient.delete(url);
    } else {
      res = await httpClient.post(url, postData);
    }
  } catch (e: any) {
    if (axios.isCancel(e)) {
      return { data: null, cancelled: true };
    }
    res.status = e.response?.status;
    res.message =
      (e.response.data?.message ||
        e.response.data?.error ||
        e.response.data ||
        e.message) +
      " " +
      (e.response.data?.detail || "");
  }
  if (res.status !== 200) throw Error(res.message);

  return { data: res.data };
}

type ApiResponse = {
  data: any;
  cancelled?: boolean;
};

export interface Address {
  zip_code: string;
  street: string;
  city: string;
}

export interface Person {
  first_name: string;
  last_name: string;
  email: string;
}
export interface ParcelType {
  is_delivered: boolean;
  sent_date: string;
  sender: Person;
  origin: Address;
  destination: Address;
  id: number;
  delivery_date: null;
  recipient: Person;
  status_history: any[];
}

export async function sendParcel(data: any): Promise<ApiResponse> {
  return await apiRequest(`send-parcel`, undefined, "POST", data);
}

export async function trackParcel(parcel_id: number): Promise<ApiResponse> {
  console.log("send2");
  return await apiRequest(`track-parcel?parcel_id=${parcel_id}`);
}

export async function getParcels(): Promise<ParcelType[]> {
  console.log("send2");
  return (await apiRequest(`parcels`))?.data;
}

export async function updateParcelStatus(status: {
  status: string;
  parcel_id: number;
}) {
  return (await apiRequest(`update-parcel-status`, undefined, "POST", status))
    ?.data;
}
