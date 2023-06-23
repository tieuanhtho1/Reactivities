import axios, { AxiosResponse } from "axios";
import { API } from "../../utilities/constants";
import { Activity } from "../models/activity";

axios.defaults.baseURL = API;

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id : string) => request.get<Activity>(`/activity/${id}`),
    create: (activity: Activity) => request.post<void>('/activities', activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;