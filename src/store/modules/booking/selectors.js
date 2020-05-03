import { createSelector } from 'reselect';

export const selectRaw = (booking) => booking;

export const selectBookingData = createSelector([selectRaw], (booking) =>
booking ? booking.data : null
);

export const selectBookLoading = createSelector([selectRaw], (booking) =>
booking ? booking.loading : false
);