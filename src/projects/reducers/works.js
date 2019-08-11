import {
  LOAD_WORK_INFO_PENDING,
  LOAD_WORK_INFO_SUCCESS,
  LOAD_WORK_INFO_FAILURE,
  UPDATE_WORK_INFO_PENDING,
  UPDATE_WORK_INFO_SUCCESS,
  UPDATE_WORK_INFO_FAILURE,
  DELETE_WORK_INFO_PENDING,
  DELETE_WORK_INFO_SUCCESS,
  DELETE_WORK_INFO_FAILURE,
  NEW_WORK_INFO_PENDING,
  NEW_WORK_INFO_SUCCESS,
  NEW_WORK_INFO_FAILURE,
  LOAD_WORK_WORKITEMS_SUCCESS,
  LOAD_WORK_WORKITEMS_PENDING,
  LOAD_WORK_WORKITEMS_FAILURE,
  CLEAR_LOADED_PROJECT,
  GET_PROJECTS_SUCCESS,
} from '../../config/constants'

import {parseErrorObj} from '../../helpers/workstreams'

const initialState = {
  isLoading: false,
  isUpdating: false,
  isDeleting: false,
  isCreating: false,
  isLoadingWorkItems: false,
  error: false,
  work: {}, // work are pushed directly into it hence need to declare first
}

export const works = function (state=initialState, action) {

  switch (action.type) {
  case LOAD_WORK_INFO_PENDING:
    return Object.assign({}, state, {
      isLoading: true,
      error: false
    })
  case LOAD_WORK_INFO_SUCCESS:
    return Object.assign({}, state, {
      isLoading: false,
      error: false,
      work: action.payload
    })
  case UPDATE_WORK_INFO_PENDING:
    return Object.assign({}, state, {
      isUpdating: true,
      error: false
    })
  case UPDATE_WORK_INFO_SUCCESS:
    return Object.assign({}, state, {
      isUpdating: false,
      error: false,
      work: action.payload
    })
  case DELETE_WORK_INFO_PENDING:
    return Object.assign({}, state, {
      isDeleting: true,
      error: false
    })
  case DELETE_WORK_INFO_SUCCESS:
    return Object.assign({}, state, {
      isDeleting: false,
      error: false,
      work: {}
    })
  case NEW_WORK_INFO_PENDING:
    return Object.assign({}, state, {
      isCreating: true,
      error: false
    })
  case NEW_WORK_INFO_SUCCESS:
    return Object.assign({}, state, {
      isCreating: false,
      error: false,
      work: action.payload
    })
  case LOAD_WORK_WORKITEMS_SUCCESS: {
    const { work } = state
    work.workitems = action.payload
    return Object.assign({}, state, {
      isLoading: false,
      error: false,
      work,
    })
  }
  case LOAD_WORK_WORKITEMS_PENDING:
    return Object.assign({}, state, {
      isLoadingWorkitems: true,
      error: false
    })
  case LOAD_WORK_INFO_FAILURE:
  case UPDATE_WORK_INFO_FAILURE:
  case DELETE_WORK_INFO_FAILURE:
  case NEW_WORK_INFO_FAILURE:
  case LOAD_WORK_WORKITEMS_FAILURE:
    return Object.assign({}, state, {
      isLoading: false,
      error: parseErrorObj(action)
    })

  // when we clear the project we have to put dashboard state to the initial state
  // because the code relies on the initial state
  // for example spinnerWhileLoading in ProjectDetail.jsx expects `isLoading` to be true
  // to prevent components which require dashboard data from rendering
  case CLEAR_LOADED_PROJECT:
  case GET_PROJECTS_SUCCESS:
    return Object.assign({}, state, initialState)

  default:
    return state
  }
}
