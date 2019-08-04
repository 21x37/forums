import _ from 'lodash';

const duplicateNotification = ({ notifcationsArr, notification, readNotificaiton }) => {


    const isDuplicateNotification = _.some(notifcationsArr, notification)
    const isDuplicateReadNotifcation = _.some(notifcationsArr, readNotificaiton)

    if (isDuplicateNotification || isDuplicateReadNotifcation) {
        return false
    } else {
        return true
    }
};

export default duplicateNotification;