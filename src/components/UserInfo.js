export default class UserInfo {
    constructor({ userName, userJob, userAvatar }) {
        this._userName = userName;
        this._userJob = userJob;
        this._userAvatar = userAvatar;
    }

    getUserInfo(data) {
        const userInfo = {
            'name': data.name,
            'about': data.about,
            'avatar': data.avatar,
            'id': data._id
        }

        return userInfo;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }
}