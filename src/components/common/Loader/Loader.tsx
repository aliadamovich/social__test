import styled from 'styled-components';
import loader from './../../../assets/images/loader.svg';

export const Loader = () => {
	return (
		<StyledLoader>
			<img src={loader} alt="" />
		</StyledLoader>
	)
}

const StyledLoader = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #ffffff8e;
	z-index: 2000000;
	img{
		width: 60px;
		height: 60px;
	}
`