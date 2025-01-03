import { PostItem } from './PostItem';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../../../../../redux/selectors/profile-selectors';
import { SendMessage } from '../../../../common/sendMessageField/SendMessage';
import { useDispatch } from 'react-redux';
import { addPostAC } from '../../../../../redux/reducers/profileReducer';
import { Timeline } from 'antd';
import styled from 'styled-components';
import { myTheme } from '../../../../../styles/Theme';



export const PostsFeed = React.memo(({isOwner}: {isOwner: boolean}) => {
	const [post, setPost] = useState('');
	const posts = useSelector(getPosts);
	const dispatch = useDispatch()

	const sendPostHandler = () => {
		if(post.trim() !== '') {
			dispatch(addPostAC(post))
			setPost('')
		}
	}

	const items = posts.map((p) => ({
		key: p.id,
		color: `${myTheme.colors.accentLight}`,
		style: { padding: '0' }, 
		children: <PostItem message={p.body} type={p.type} />,
	}));
	
	return (
		<StyledPostSection>
			{isOwner ?
			<>
				<SendMessage 
					updateText={(e) => { setPost(e) }} 
					addMessage={sendPostHandler} 
					messageText={post}
					showCount={true}
					maxLength={100}
					title='Send Post'
					loading={false}
				/>
				<StyledPostsContainer>
					<Timeline items={items} />
				</StyledPostsContainer>
			</>
			: <div>No posts yet...</div>
			}
		</StyledPostSection>
	)
})

const StyledPostSection = styled.div`
	>div:nth-child(1){
		border-top: none;
	}
`
const StyledPostsContainer = styled.div`
	padding: 0 40px;

		@media ${myTheme.media[576]} {
			padding: 0 10px;
		}
`