export default class UserInfo {
    constructor({ userName, userJob, userAvatar, _id }) {
        this._userName = userName;
        this._userJob = userJob;
        this._userAvatar = userAvatar;
        this._id = _id;
    }

    getUserInfo() {
        const userInfo = {
            'name': this._userName.textContent,
            'job': this._userJob.textContent,
            'avatar': this._userAvatar.src,
            '_id': this._id
        }

        return userInfo;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
        this._userAvatar.src = data.avatar;
        this._id = data._id;
    }
}