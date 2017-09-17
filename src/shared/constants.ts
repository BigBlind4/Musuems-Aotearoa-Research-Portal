export const CategoryList = [
    { id: 1, name: 'Archives' },
    { id: 2, name: 'Article' },
    { id: 3, name: 'Audio' },
    { id: 4, name: 'Images' },
    { id: 5, name: 'Research' },
    { id: 6, name: 'Sets' },
    { id: 7, name: 'Other' }
]

export const SESSION_KEYS = {
    SEARCH_ITEM: 'SEACH_ITEM',
    LOGIN_STATUS: 'LOGIN_STATUS'
};

export const CHANGE_NOTIFICATION_KEYS = {
    SEARCH_ITEM_CHANGED : 'SEARCH_ITEM_CHANGED',
    LOGIN_STATUS_CHANGED: 'LOGIN_STATUS_CHANGED'
};

export const API_METHODS = {
    //SEARCH : 'http://api.digitalnz.org/v3/records.json?api_key=svowNJL8JgZVmBMhUzho',
    SEARCH : 'http://172.20.0.208:8089/search/records?api_key=e3bspeteEJZtp6sszzN5',
    LOGIN : 'http://172.20.0.208:8089/login/member',
    UPLOAD_FILE : ''
}