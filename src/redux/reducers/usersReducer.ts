import { Dispatch } from "redux";
import { usersAPI } from "../../apiDal/apiDal";
import { UserType } from "../../types/types";
import { AppStateType, AppThunk } from "../redux-store";


let initialState = {
	users: [] as Array<UserType>,
	currentPage: 1,
	totalUsers: 0,
	usersOnPage: 9,
	isFetching: false,
	followingInProgress: [] as Array<number>, //Array od usersId
}


export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case 'TOGGLE-FOLLOW':
			return {
				...state, 
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return {
							...u,
							followed: !u.followed
						};
					}
					return u;
				}),
			}

		case 'SET-USERS':
			return { ...state, users: action.users }

		case 'GET-USERS-QUANTITY':
			return {
				...state, totalUsers: action.number }

		case 'CHANGE-CURRENT-PAGE':
			return{
				...state, 
				currentPage: action.num
			}
		case 'LOAD-MORE-USERS':
			 return{
				...state,
				users: [...state.users, ...action.users]
			 }
			case 'TOGGLE-IS-FETCHING':
				return {
					...state,
					isFetching: action.isFetching
				}
		case 'TOGGLE-FOLLOWING-PROGRESS':
			return {
				...state,
				followingInProgress: action.isFetching 
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}

		default:
			return state;
	}
}

//* Action Creators
export const toggleFollowAC = (userId: number) => ({ type: 'TOGGLE-FOLLOW', userId } as const)
export const setUsersAC =(users: Array<UserType>) => ({type: 'SET-USERS', users }) as const;
export const getUsersQuantityAC = (number: number) => ({ type: 'GET-USERS-QUANTITY', number } as const);
export const changeCurrentPageAC = (num: number) => ({ type: 'CHANGE-CURRENT-PAGE', num} as const);
export const loadMoreUsersAC = (users: Array<UserType>) => ({type: 'LOAD-MORE-USERS', users} as const);
export const toggleIsFetchingAC = (isFetching: boolean) => ({ type: 'TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number) => ({ type: 'TOGGLE-FOLLOWING-PROGRESS', isFetching, userId} as const)


//* Thunks
export const getUsersThunkCreator = ( currentPage: number, usersOnPage: number,isFriend = false): AppThunk => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const resp = await usersAPI.getUsers(currentPage, usersOnPage, isFriend);
    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAC(resp.items));
    dispatch(getUsersQuantityAC(resp.totalCount));
  };
};


export const loadMoreUsersThunkCreator = (currentPage: number, usersOnPage: number): AppThunk => {
	return async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const newPage = currentPage + 1;
    dispatch(changeCurrentPageAC(newPage));

    const response = await usersAPI.getUsers(newPage, usersOnPage);

    dispatch(loadMoreUsersAC(response.items));
    dispatch(toggleIsFetchingAC(false));
  };
}


export const followUsersThunkCreator = (userId: number): AppThunk => {
  return async (dispatch) => {
		// debugger
		dispatch(toggleFollowingProgressAC(true, userId));

    const isFollowed = await usersAPI.checkFollow(userId);
		let respData;
    if (isFollowed === false) {
      respData = await usersAPI.follow(userId);
    } else {
      respData = await usersAPI.unfollow(userId);
    }

		if (respData.resultCode === 0) {
      dispatch(toggleFollowAC(userId));
    }
		dispatch(toggleFollowingProgressAC(false, userId));
		
  };
};




//* Types
type InitialStateType = typeof initialState;

type ActionsType =
  | ReturnType<typeof toggleFollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof getUsersQuantityAC>
  | ReturnType<typeof changeCurrentPageAC>
  | ReturnType<typeof loadMoreUsersAC>
  | ReturnType<typeof toggleIsFetchingAC>
  | ReturnType<typeof toggleFollowingProgressAC>;