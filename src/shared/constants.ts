export const SESSION_KEYS = {
    SEARCH_ITEM: 'SEACH_ITEM',
    LOGIN_STATUS: 'LOGIN_STATUS',
    USER_ID: 'USER_ID',
    FILE_ID: 'FILE_ID',
    UPLOAD_ID: 'UPLOAD_ID'
};

export const CHANGE_NOTIFICATION_KEYS = {
    SEARCH_ITEM_CHANGED : 'SEARCH_ITEM_CHANGED',
    LOGIN_STATUS_CHANGED: 'LOGIN_STATUS_CHANGED'
};

export const API_METHODS = {
    //SEARCH : 'http://api.digitalnz.org/v3/records.json?api_key=svowNJL8JgZVmBMhUzho',
    SEARCH : 'http://10.140.37.26:8089/search/records?api_key=e3bspeteEJZtp6sszzN5',
    LOGIN : 'http://10.140.37.26:8089/login/member',
    UPLOAD_FILE : 'http://10.140.37.26:8089/file/uploadFile',
    UPLOAD : 'http://10.140.37.26:8089/file/uploadDetails',
    GET_UPLOAD_LIST : 'http://10.140.37.26:8089/file/getUploadDetailsList',
    GET_FILE_BY_ID : 'http://10.140.37.26:8089/file/getUploadDetails',
    REMOVE_FILE_BY_ID : 'http://10.140.37.26:8089/file/removeFile',
    REMOVE_UPLOAD: 'http://10.140.37.26:8089/file/removeUpload',
    UPDATE_UPLOAD: 'http://10.140.37.26:8089/file/updateDetails',
    UPDATE_PROFILE: ''
}