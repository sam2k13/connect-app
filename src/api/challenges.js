import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { TC_API_URL } from '../config/constants'

/**
 * Get challenges
 *
 * @param {Array} challengeIds array of challenge ids
 *
 * @return {Promise} resolves to challenges
 */

export function getChallenges(challengeIds) {
  return axios.get(`${TC_API_URL}/v4/challenges/?filter=id=in(${challengeIds.join(',')})`)
    .then(resp => _.get(resp.data, 'result.content', []))
}

/**
 * Get my challenges
 *
 * @param {String} handle member handle
 * @param {Number} limit limit number of challenges
 * @param {Number} offset challenges offset
 *
 * @return {Promise} resolves to challenges
 */

export function getMyChallenges(handle, limit, offset) {
  return axios.get(`${TC_API_URL}/v4/members/${handle}/challenges/?filter=status%3DACTIVE&limit=${limit}&offset=${offset}`)
    .then(resp => _.get(resp.data, 'result.content', []))
}

/**
 * Get all challenges
 *
 * @param {Number} limit limit number of challenges
 * @param {Number} offset challenges offset
 *
 * @return {Promise} resolves to challenges
 */

export function getAllChallenges(limit, offset) {
  return axios.get(`${TC_API_URL}/v4/challenges/?filter=status%3DACTIVE&limit=${limit}&offset=${offset}`)
    .then(resp => _.get(resp.data, 'result.content', []))
}