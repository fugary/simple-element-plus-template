import { $httpPost } from '@/vendors/axios'

/**
 * @typedef {Object} CityDto
 * @property {string} code
 * @property {string} nameCn
 * @property {string} nameEn
 */
/**
 * 加载可选城市数据
 * @return {{success:boolean, message:string, resultData: {cityList:[CityDto]}}}
 */
export const loadSelectCities = (query, config) => {
  return $httpPost('/city/selectCities', query, config)
}
/**
 * 加载自动完成城市数据
 * @return {{success:boolean, message:string, resultData: {cityList:[CityDto]}}}
 */
export const loadAutoCities = (data, config) => {
  return $httpPost('/city/autoCities', data, config)
}
