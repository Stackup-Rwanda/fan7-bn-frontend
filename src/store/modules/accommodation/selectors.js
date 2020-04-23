import { createSelector } from 'reselect';

export const selectRaw = (accommodation) => accommodation;

export const selectAccommodations = createSelector([selectRaw], (accommodation) =>
  accommodation ? accommodation.accommodations : []
);

export const selectAccommodation = createSelector([selectRaw], (accommodation) =>
  accommodation ? accommodation.accommodation : null
);

export const selectLoading = createSelector([selectRaw], (accommodation) =>
accommodation ? accommodation.loading : false
);