export const SESSION_KEYS = {
    SEARCH_ITEM: 'SEACH_ITEM',
    LOGIN_STATUS: 'LOGIN_STATUS',
    USER_ID: 'USER_ID',
    FILE_ID: 'FILE_ID',
    UPLOAD_ID: 'UPLOAD_ID',
    ROLE: 'ROLE',
    TOPIC_ID: 'TOPIC_ID'
};

export const DEFAULT_VALUES = {
    ITEM_PER_PAGE: 3
}

export const CHANGE_NOTIFICATION_KEYS = {
    SEARCH_ITEM_CHANGED : 'SEARCH_ITEM_CHANGED',
    LOGIN_STATUS_CHANGED: 'LOGIN_STATUS_CHANGED'
};

export const ROLES = {
    ADMIN: '1',
    MEMBER: '2'
};

export const APPROVE_ACTION = {
    APPROVE: '0',
    REJECT: '1'
};

export const API_METHODS = {
    //SEARCH : 'http://api.digitalnz.org/v3/records.json?api_key=svowNJL8JgZVmBMhUzho',
    SEARCH : 'http://10.140.136.231:8089/search/records?api_key=e3bspeteEJZtp6sszzN5',
    LOGIN : 'http://10.140.136.231:8089/login/member',
    UPLOAD_FILE : 'http://10.140.136.231:8089/file/uploadFile',
    UPLOAD : 'http://10.140.136.231:8089/file/uploadDetails',
    GET_UPLOAD_LIST : 'http://10.140.136.231:8089/file/getUploadDetailsList',
    GET_FILE_BY_ID : 'http://10.140.136.231:8089/file/getUploadDetails',
    REMOVE_FILE_BY_ID : 'http://10.140.136.231:8089/file/removeFile',
    REMOVE_UPLOAD: 'http://10.140.136.231:8089/file/removeUpload',
    UPDATE_UPLOAD: 'http://10.140.136.231:8089/file/updateDetails',
    UPDATE_PROFILE: 'http://10.140.136.231:8089/user/updateProfile',
    CREATE_POST: 'http://10.140.136.231:8089/messageboard/newPost',
    GET_POST_LIST: 'http://10.140.136.231:8089/messageboard/getPostList',
    GET_POST_DETAIL_BY_TOPIC_ID: 'http://10.140.136.231:8089/messageboard/getPostListByTopicId',
    ADD_COMMENTS: 'http://10.140.136.231:8089/messageboard/addComments',
    DELETE_COMMENTS: 'http://10.140.136.231:8089/messageboard/deleteComments',
    UPDATE_POST: 'http://10.140.136.231:8089/messageboard/updatePost',
    GET_POST_LIST_BY_USER_ID: 'http://10.140.136.231:8089/messageboard/getPostListByUserId',
    DELETE_POST: 'http://10.140.136.231:8089/messageboard/deletePost',
    GET_POST_EDIT_DETAIL: 'http://10.140.136.231:8089/messageboard/getPostEditDetail',
    GET_APPROVAL_LIST: 'http://10.140.136.231:8089/file/getApprovalList',
    UPLOAD_ACTION: 'http://10.140.136.231:8089/file/uploadAction',
    UPDATE_PASSWORD: 'http://10.140.136.231:8089/user/updatePassword',
    GET_USER_PROFILE: 'http://10.140.136.231:8089/user/getUserProfile'
}

