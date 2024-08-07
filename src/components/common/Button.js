import styled from 'styled-components';

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(to right, rgb(189, 139, 237), rgb(129, 29, 222));
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
	color: #fff;
	padding: 2px 28px;
	height: 40px;
	border-radius: 18px;
	transition: all 0.7s ease 0s;
	font-size: 14px;
	font-weight: 500;
	border: none;
	&:hover {
		opacity: 0.8;
	}
	&:disabled {
		background-color: lightgray;
		cursor: default;
		border: none;

	}
`