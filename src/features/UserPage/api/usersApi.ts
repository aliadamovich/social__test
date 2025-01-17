import { baseApi } from "app/baseApi"
import { ResponseWithItems, StandartResponse } from "common/types/types"
import { getUsersParams, UserType } from "features/UserPage/api/usersApi.types"

export const INITIAL_SEARCH_PARAMS = {
	count: 12,
	page: 1,
}
export const usersAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<ResponseWithItems<UserType[]>, getUsersParams>({
			query: (params) => ({
				url: "users",
				params: { ...INITIAL_SEARCH_PARAMS, ...params },
			}),
			providesTags: ["Users"],
		}),
		checkFollow: build.query<boolean, number>({
			query: (userId) => `follow/${userId}`,
			providesTags: ["Users"],
		}),
		followUser: build.mutation<StandartResponse, number>({
			query: (userId) => ({
				url: `follow/${userId}`,
				method: "POST",
			}),
			invalidatesTags: ["Users"],
		}),
		unfollowUser: build.mutation<StandartResponse, number>({
			query: (userId) => ({
				url: `follow/${userId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
	}),
})

export const {useGetUsersQuery, useFollowUserMutation, useUnfollowUserMutation, useLazyCheckFollowQuery} = usersAPI

