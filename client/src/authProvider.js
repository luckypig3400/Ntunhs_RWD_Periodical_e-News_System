// Authenticated by default
export default {
    login: ({ username, password }) => {
        if (username === 'admin' && password === '1234') {
            localStorage.removeItem('not_authenticated');
            localStorage.removeItem('role');
            localStorage.setItem('login', 'login');
            localStorage.setItem('user', 'John Doe');
            localStorage.setItem(
                'avatar',
                'data:image/jpeg;base64,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'
            );
            return Promise.resolve();
        }
        localStorage.setItem('not_authenticated', 'true');
        return Promise.reject();
    },
    logout: () => {
        localStorage.setItem('not_authenticated', 'true');
        localStorage.removeItem('role');
        localStorage.removeItem('login');
        localStorage.removeItem('user');
        localStorage.removeItem('avatar');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        return status === 401 || status === 403 ?
            Promise.reject() :
            Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('not_authenticated') ?
            Promise.reject() :
            Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    },
    getIdentity: () => {
        return Promise.resolve({
            id: localStorage.getItem('login'),
            fullName: localStorage.getItem('user'),
            avatar: localStorage.getItem('avatar'),
        });
    },
};