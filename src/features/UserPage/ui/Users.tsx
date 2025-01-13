import { useEffect, useState } from 'react';
import { User } from './User';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { useSearchParams } from 'react-router-dom';
import { UsersSkeleton } from './UsersSkeleton';
import { selectStatus } from '../../../app/appSlice';
import { useAppDispatch } from 'app/hooks';
import { GridWrapper } from 'common/components/GridWrapper';
import { Recent } from 'common/components/Recent/Recent';
import { selectUsers, selectTotalUsers, selectFollowingInProgress, selectSearchParams, getUsersTC, resetSearchParams, updateParams, followUserTC } from 'features/UserPage/model/usersSlice';
import { Search } from 'common/components/Search/Search';
import { INITIAL_SEARCH_PARAMS, useGetUsersQuery } from 'features/UserPage/api/usersApi';
import { Pagination } from 'antd';
import { getUsersParams } from 'features/UserPage/api/usersApi.types';

export const Users = () => {
	const followingInProgress = useSelector(selectFollowingInProgress);
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const appStatus = useSelector(selectStatus)
	const params = Object.fromEntries(searchParams)

	const {data} = useGetUsersQuery(params)
	const users = data?.items

	const toggleFollowUsers = async (userId: number) => {
		dispatch(followUserTC(userId));
	}

	const changeCurrentPage = async (currentPage: number) => {
		updateSearchParams({ page: currentPage.toString() })
	}

	const updateSearchParams = (newParams: Partial<Record<keyof getUsersParams, string>>) => {
			setSearchParams(prevParams => ({
				...Object.fromEntries(prevParams),
				...newParams,
			}));
		// dispatch(updateParams({ params: newParams }));
	}

	const searchInputChangeHandler = (value: string) => {
		updateSearchParams({ term: value })
	}


	// if(appStatus === 'loading') return <UsersSkeleton />

	return (
		<>
			<Search
				debounceChange={searchInputChangeHandler}
				initialValue={params.term || ''}
			/>
			{appStatus === 'loading' ? <UsersSkeleton /> :
				<StyledUsersContainer>
					<StyledUsersContent>

						<Pagination
							defaultCurrent={INITIAL_SEARCH_PARAMS.page}
							defaultPageSize={INITIAL_SEARCH_PARAMS.count}
							total={data?.totalCount}
							onChange={changeCurrentPage}
							showSizeChanger={false}
							style={{ marginBottom: '20px' }}
							align='end'
						/>
						<GridWrapper gap='15px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
							{
								users?.map(u =>
									<User u={u}
										toggleFollowUsers={toggleFollowUsers}
										key={u.id}
										followingInProgress={followingInProgress}
									/>
								)}
						</GridWrapper>
					</StyledUsersContent>
					<Recent />
				</StyledUsersContainer>
			}
		</>
	)
}

const StyledUsersContainer = styled.div`
	position: relative;
	overflow: hidden;
	padding: 20px 10px;
	border-top: 1px solid ${myTheme.colors.borderColor};
	display: flex;
	gap: 40px;
	
	>div:nth-child(2) {
		flex: 1 1 auto;
	}
`

const StyledUsersContent = styled.div`
	flex: 0 1 75%;
`