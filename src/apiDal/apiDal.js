import axios from "axios";

//с помощью встроенного метода create создается объект с базовыми насройками
const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { "API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b" }
})


//доп объекты с методами
export const usersAPI = {
	getUsers (currentPage, usersOnPage, isFriend ) {
		const friendQuery = isFriend ? `&friend=${isFriend}` : '';
		return axiosInstance.get(`users?page=${currentPage}&count=${usersOnPage}${friendQuery}`)
	.then(resp => resp.data)
	},
	checkFollow(userId) {
		return axiosInstance.get(`follow/${userId}`)
			.then(resp => resp.data)
	},
	follow(userId) {
		return axiosInstance.post(`follow/${userId}`)
			.then(resp => resp.data)
	},
	unfollow(userId) {
		return axiosInstance.delete(`follow/${userId}`)
			.then(resp => resp.data)
	},
}

export const profileAPI = {

	setProfile(profileId) {
		return axiosInstance.get(`profile/${profileId}`)
	},

	getStatus(profileId) {
		return axiosInstance.get(`profile/status/${profileId}`)
	},

	updateStatus(status) {
		return axiosInstance.put(`profile/status`, {status: status})
	},

	setProfilePhoto(photo) {
		const formData = new FormData()
		formData.append('image', photo)
		return axiosInstance.put(`profile/photo`, formData, {
			headers: { "Content-Type": "multipart/form-data"}} )
	},
	setProfileInfo(form) {
		return axiosInstance.put(`profile/`, form)
	}
}

export const authAPI = {
	me() {
		return axiosInstance.get('auth/me')
	},
	login(email, password, rememberMe = false) {
		return axiosInstance.post('auth/login', {email, password, rememberMe})
	},
	logout() {
		return axiosInstance.delete('auth/login')
	}
}

