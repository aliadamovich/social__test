import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '../../../common/components/Avatar';
import { FlexWrapper } from '../../../common/components/FlexWrapper';
import { MainButton } from '../../../common/components/MainButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../routes/routes';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { Header } from 'antd/es/layout/layout';
import { LogoutThunkCreator, selectIsAuth, selectProfileData } from 'features/LoginPage/model/authSlice';
import { AppDispatch } from 'app/store';

type HeaderPropsType ={
	collapsed: boolean
	setCollapsed: (value: boolean) => void
}


export const HeaderBlock = ({ collapsed, setCollapsed}: HeaderPropsType) => {
	const { Header } = Layout;
	const { token: { colorBgContainer }, } = theme.useToken();
	const {login, photos} = useSelector(selectProfileData);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>()
	const isAuth = useSelector(selectIsAuth);

	const onLogoutHandler = () => {
		setLoading(true)
		dispatch(LogoutThunkCreator()).then(() => {
			setLoading(false)
		})
	}

	return (
		
		<Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
		<>
				<SiderButton
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
			/>
			<HeaderContainer >
				<FlexWrapper gap='10px' align='center'>
					<span>{login}</span>
					{photos?.small && <Avatar photo={photos.small} />}
				</FlexWrapper>

				{isAuth ?
					<MainButton onClick={onLogoutHandler} icon={<PoweroffOutlined />} children={'Log out'} loading={loading} />
					:
					<Link to={PATH.LOGIN}>
						<Button variant="link">Login</Button>
					</Link>
				}
				
			</HeaderContainer>
		</>
		</Header>
	)
}

const StyledHeader = styled(Header)<{bg: string}>`
	padding: 0;
	background: ${props => props.bg};
	display: 'flex';
	justify-content: 'space-between';

`

const SiderButton = styled(Button)`
	font-size: 16px;
	width: 64px;
	height: 64px;

	@media ${myTheme.media[768]} {
		display: none;
	}
`

const HeaderContainer = styled.div`
	display: flex;
	gap: 40px;
	margin-right: 24px;
	align-items: center;

@media ${myTheme.media[768]} {
		flex: 1 1 auto;
		justify-content: end;
	}

	@media ${myTheme.media[576]} {
		gap: 20px;
	}
`