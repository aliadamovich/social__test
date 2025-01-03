import styled from 'styled-components';
import { Icon } from '../Icon';
import { Field } from 'formik';
import { Input, Spin } from 'antd';
import { ChangeEvent, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { AppStateType } from '../../../redux/redux-store';
import { AppStatusType } from '../../../redux/reducers/appReducer';
import { useSelector } from 'react-redux';
type Props = {
	debounceChange?: (value: string) => Promise<void>
	searchInputChangeHandler: (value: string) => void
	value: string
}

export const Search = ({ debounceChange, searchInputChangeHandler, value }: Props) => {
	const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
	const [searchInProgress, setSearchInProgress] = useState(false);
	const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status);
	
	const onChangeTextCallback = (e: ChangeEvent<HTMLInputElement>) => {
		searchInputChangeHandler(e.currentTarget.value)
		if (debounceChange) {
			setSearchInProgress(true)
			clearTimeout(timerId)
			const newTimer = setTimeout(async () => {
				await debounceChange(e.currentTarget.value);
				setSearchInProgress(false)
			}, 1500)
			setTimerId(newTimer)
		}
	}

	const searchValueHandler = async () => {
		setSearchInProgress(true);
		await debounceChange?.(value);
		setSearchInProgress(false)
	}

	return(
		<StyledSearch>
			{/* {searchInProgress && <Spin indicator={<LoadingOutlined spin />} size="small" />} */}
			<Input type="text" value={value} placeholder='Search' onChange={onChangeTextCallback} />
			<StyledIconButton onClick={searchValueHandler} disabled={searchInProgress === true || appStatus=== 'loading'}>
				<Icon iconId='search' viewBox="0 0 129 129" fill='#FFF' width='15' height='15' />
			</StyledIconButton>
		</StyledSearch>
	)
}


const StyledSearch = styled.div`
	padding: 13px 10px;
	display: flex;
	align-items: center;
	gap: 10px;

	input {
		border: 1px solid rgb(237, 241, 245);
		border-radius: 20px;
		padding: 6px 10px;
		min-width: 200px;
		font-size: 17px;

		&::placeholder {
			font-weight: 500;
		}
	}
`

const StyledIconButton = styled.button`
	width: 30px;
	height: 30px;
	background: linear-gradient(to top left, rgb(189, 139, 237), rgb(129, 29, 222));
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s ease 0s;
	border: none;
	
	&:hover{
		opacity: 0.8;
	}

	&:disabled {
		opacity: 0.5;
		cursor: auto;
	}
`