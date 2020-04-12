import { createSelector } from 'reselect';

export const selectRaw = (notifications) => notifications;

export const selectNotifications = createSelector([selectRaw], (notifications) =>
  notifications
    ? notifications.notifications.filter((notification) => notification.status === 'unread')
    : []
);

export const selectCount = createSelector([selectNotifications], (notifications) =>
  notifications ? notifications.length : 0
);

export const selectLoading = createSelector([selectRaw], (notifications) =>
  notifications ? notifications.loading : false
);
