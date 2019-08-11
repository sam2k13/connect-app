import {
getWorkWorkitems
} from '../../api/workitems'
import {
LOAD_WORK_WORKITEMS
} from '../../config/constants'

/**
 * Get workitems for work
 * @param {Function} dispatch     dispatch
 * @param {String} projectId    project id
 * @param {String} workstreamId   workstream id
 * @param {String} workId   work id
 * 
 * @return {Function} dispatch function
 */
function getWorkitemsForWork(dispatch, projectId, workstreamId, workId) {
  return dispatch({
    type: LOAD_WORK_WORKITEMS,
    payload:  new Promise((resolve, reject) => {
      return getWorkWorkitems(projectId, workstreamId, workId)
          .then((resp) => {
            workstream.works = resp
            resolve(workstream)
          })
          .catch(err => reject(err))
    }),
  })
}
