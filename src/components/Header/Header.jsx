import c from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import search from './../../assets/images/search.png'
import user_min from './../../assets/images/user_example.jpeg';
import { useSelector } from 'react-redux';


export const Header = () => {
	// debugger
	const login = useSelector(state => state.auth.autID.login);
	const isAuth = useSelector(state => state.auth.isAuth);

	return(
		<header className={c.header}>
			<div className={c.container}>
				<div className={c.search}>
					<label htmlFor=''></label>
						<img className={c.search__icon} src={search} alt="search" />
						<input placeholder='search' type="text" name="" id="" />
				</div>
				<div className={c.exit}>
					
					{
					isAuth ?
					<div className={c.exit__auth}>
						<span className={c.exit__text}>{login}</span>
						<a href='#' className={c.exit__avatar}>
									<img src={user_min} alt="user logo" />
						</a>
					</div>
					: <NavLink className={c.exit__text} to="/login">Login</NavLink> 
					}
				</div>
			</div>
		</header>
	)
}
