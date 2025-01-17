export const CommonErrors = {
    userNotFound: new Error('user not found'),
    newPasswordError: new Error('the new password cannot mathch the current password.'),
    invalidEmail: new Error('the provided email is incorrect'),
    invalidPassword: new Error('the provided password is incorrect')
};