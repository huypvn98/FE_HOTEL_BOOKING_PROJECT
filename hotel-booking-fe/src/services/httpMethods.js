import { axiosClientVer2 } from "../axios/axiosInterceptor";
import handleError from "../axios/error";

// [GET]
const getRequest = async (url) => {
  try {
    const res = await axiosClientVer2.get(`${url}`);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

// [GET] -> params
const getRequestParams = async (url, params) => {
  try {
    const res = await axiosClientVer2.get(`${url}`, { params: params });
    return res;
  } catch (error) {
    return handleError(error);
  }
};

const postRequestParams = async (url, params) => {
  try {
    const res = await axiosClientVer2.post(`${url}`, { params: params });
    return res;
  } catch (error) {
    return handleError(error);
  }
};

// [POST]
const postRequest = async (url, payload) => {
  try {
    const res = await axiosClientVer2.post(`${url}`, payload);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

// [POST] -> multipart/form-data (file, ...)
const postRequestFormData = async (url, payload) => {
  try {
    const res = await axiosClientVer2.post(`${url}`, payload,{
      headers: {
        "Content-Type": "multipart/form-data",
    }});
    return res;
  } catch (error) {
    return handleError(error);
  }
};


// [DELETE]
const deleteRequest = async (url) => {
  try {
    const res = await axiosClientVer2.delete(`${url}`);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

// [PUT]
const putRequest = async (url, payload) => {
  try {
    const res = await axiosClientVer2.put(`${url}`, payload);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

// [PUT] -> multipart/form-data (file, ...)

// [PATCH]
const patchRequest = async (url, payload) => {
  try {
    const res = await axiosClientVer2.patch(`${url}`, payload);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export {
  getRequest,
  getRequestParams,
  postRequest,
  deleteRequest,
  putRequest,
  patchRequest,
  postRequestParams,
  postRequestFormData
};
