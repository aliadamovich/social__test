import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { obtainUsers } from '../../../../redux/selectors/users-selectors'
import { SideDialogItem } from './SideDialogItem'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../../redux/app/hooks'
import { getUsersThunkCreator } from '../../../../redux/reducers/usersReducer'
import { myTheme } from '../../../../styles/Theme'
import { AppStatusType } from '../../../../redux/reducers/appReducer'
import { AppStateType } from '../../../../redux/redux-store'
import { Skeleton } from 'antd'
import { SideDialogsSkeleton } from '../dialogSkeletons/SideDialogsSkeleton'


type Props = {
	onDialogClick: () => void
}

export const SideDialogs = ({ onDialogClick }: Props) => {

	const users = useSelector(obtainUsers);
	const dispatch = useAppDispatch();
	const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status);
	useEffect(() => { dispatch(getUsersThunkCreator({count: 20, page: 1, friend: true})) }, [])

	const dialogsArray = users.map(u => {
		return < SideDialogItem
		key = { u.id }
		name = { u.name }
		id = { u.id }
		photo = { u.photos.small }
		onDialogClick={onDialogClick}
			/>
	}
	)

	if (appStatus === 'loading') return <SideDialogsSkeleton />

	

	return (
		<StyledDialogsBox>{dialogsArray}</StyledDialogsBox>
	)
}


const StyledDialogItems = styled.div<{ isSideDialogsVisible: boolean }>`
	flex: 0 0 25%;
	border-right: 1px solid ${myTheme.colors.borderColor};
	padding: 2px 0;
	transform: translateX(0);

	@media ${myTheme.media[950]} {
		flex: 0 0 100%;
		transition: transform 0.3s ease;
		transform: ${({ isSideDialogsVisible }) =>
		isSideDialogsVisible ? 'translateX(0)' : 'translateX(-100%)'};
	}
`

const StyledDialogsBox = styled.div`
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: 15px;
	scrollbar-width: 0;
	&::-webkit-scrollbar {
		display: none;
	}
`
