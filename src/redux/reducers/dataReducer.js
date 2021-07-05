import {
	LOADING_DATA,
	SET_INVESTIGATION,
    SET_INVESTIGATIONS,
    SET_INV_ID
} from "../types";

const initialState = {
	investigations: [],
	investigation: {},
	invID: "",
	loading: false,
};

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_INVESTIGATIONS:
			return {
				...state,
				investigations: action.payload,
				loading: false,
			};
		case SET_INVESTIGATION:
			return {
				...state,
				investigation: action.payload,
			};
		case SET_INV_ID:
			return {
				...state,
				invID: action.payload
			};
		default:
			return state;
	}
}

export default dataReducer;