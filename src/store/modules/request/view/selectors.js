import { createSelector } from 'reselect';

export const selectRaw = viewRequests => viewRequests;

export const selectLoading = createSelector([selectRaw], viewRequests =>
  viewRequests ? !!viewRequests.loading : false
);

export const selectCount = createSelector([selectRaw], viewRequests =>
  viewRequests ? viewRequests.count : 0
);

export const selectRequests = createSelector([selectRaw, selectCount], (viewRequests, count) =>
  viewRequests && count > 0
    ? viewRequests.requests.map(request => ({
        ...request,
        requester: request.user.email,
        returnDate: request.return_date || '-',
      }))
    : []
);

// export const selectNumberOfRows = createSelector([selectRaw], viewRequests =>
//   viewRequests ? viewRequests.NumberOfRows : 1
// );

// export const selectPage = createSelector([selectRaw], viewRequests =>
//   viewRequests ? viewRequests.page : 1
// );
