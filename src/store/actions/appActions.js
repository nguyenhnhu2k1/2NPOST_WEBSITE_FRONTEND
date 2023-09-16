import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});

export const changeLanguageApp = (language) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: language
});

export const changeShowNavApp = (showNav) => ({
    type: actionTypes.CHANGE_SHOW_NAV,
    showNav: showNav
});

export const changeCurrentTag = (tag) => ({
    type: actionTypes.CHANGE_CURRENT_TAG,
    currentTag: tag
});