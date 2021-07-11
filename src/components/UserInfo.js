export default class UserInfo {
    constructor({ userName, userJob }) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        this._userInfo = {
            'name': this._userName.textContent,
            'job': this._userJob.textContent
        }

        return this._userInfo;
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}