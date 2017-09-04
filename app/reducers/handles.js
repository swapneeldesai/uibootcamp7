import {ADD_HANDLE, REQUEST_TWEETS, RECEIVE_TWEETS} from '../actions/handles'
import {fetchTweets} from '../effects/handles'
import {loop, Effects} from 'redux-loop'

export default (state = [], action) => {
	switch (action.type) {
		case ADD_HANDLE:
			let newState = state.map((handles) => handles)

			newState.push({
				name      : action.handle,
				isFetching: true,
				data      : []
			})

			return newState

		case REQUEST_TWEETS:

			return loop(
				state, Effects.promise(fetchTweets, action.handle)
			)

		case RECEIVE_TWEETS:
			return state.map((handle) => {
				if (handle.name === action.handle) {
					handle.data       = action.data
					handle.isFetching = false
				}
				return handle
			})

		default:
			return state
	}
}