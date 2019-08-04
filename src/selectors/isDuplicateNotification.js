import _ from 'lodash'; 

const isDuplicateNotification = (arr, notification, cb) => {

    const readNotification = _.clone(notification);
    readNotification.unread = false;

    const readDuplicate = _.some(arr, readNotification);
    const unReadDuplicate = _.some(arr, notification);

    if (!readDuplicate && unReadDuplicate) {
        return cb(true);
    } else if (readDuplicate && !unReadDuplicate) {
        return cb(true);
    }   else {
        return cb(false);
    }
};

export default isDuplicateNotification;