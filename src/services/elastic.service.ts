import axios, { AxiosRequestConfig } from "axios";
import {
  ElasticResponse,
  DepartmentResource,
  CityResource,
} from "../types/elastic.interface";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.ELASTICSEARCH_URL,
  headers: {
    Authorization: `Basic ${import.meta.env.ELASTICSEARCH_AUTH}`,
  },
};

export const ElasticService = {
  async getProvinces() {
    const response = await axios.post<ElasticResponse<DepartmentResource>>(
      "/departments/_search/template",
      {
        id: "alldepartments",
      },
      config
    );
    return response.data.hits.hits;
  },
  async getCities(provinceId: number) {
    const response = await axios.post<ElasticResponse<CityResource>>(
      "/cities/_search/template",
      {
        id: "citiesbydepartment",
        params: { id: provinceId },
      },
      config
    );
    return response.data.hits.hits;
  },
};
