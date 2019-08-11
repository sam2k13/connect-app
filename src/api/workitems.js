import _ from 'lodash'
import { axiosInstance as axios } from './requestInterceptor'
import { PROJECTS_API_URL } from '../config/constants'

/**
 * Get work workitems
 *
 * @param {String} projectId project id
 * @param {String} workstreamId workstream id
 * @param {String} workId work id
 *
 * @return {Promise} resolves to work workitems
 */

GET 
export function getWorkWorkitems(projectId, workstreamId, workId) {
  return axios.get(`${PROJECTS_API_URL}/v4/projects/${projectId}/workstreams/${workstreamId}/works/${workId}/workitems`)
    .then(resp => _.get(resp.data, 'result.content', []))
}