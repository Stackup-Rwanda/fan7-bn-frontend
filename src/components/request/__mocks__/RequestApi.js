const requests = [
  { id: 1, status: 'Pending' },
  { id: 2, status: 'Pending' },
  { id: 3, status: 'Approved' },
  { id: 4, status: 'Rejected' },
  { id: 5, status: 'Pending' },
  { id: 6, status: 'Pending' },
  { id: 7, status: 'Approved' },
  { id: 8, status: 'Rejected' },
  { id: 9, status: 'Pending' },
  { id: 10, status: 'Pending' },
  { id: 11, status: 'Approved' },
  { id: 12, status: 'Rejected' },
  { id: 13, status: 'Pending' },
  { id: 14, status: 'Approved' },
  { id: 15, status: 'Rejected' },
  { id: 16, status: 'Pending' },
  { id: 17, status: 'Rejected' },
  { id: 18, status: 'Approved' },
  { id: 19, status: 'Pending' },
  { id: 20, status: 'Pending' },
];

class RequestApi {
  static getRequests(params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const responseRequests = {};
        const searchRange = requests.slice(
            params.numberOfRows * params.page - params.numberOfRows,
            params.numberOfRows * params.page
        );

        responseRequests.requests = searchRange;
        responseRequests.total = requests.length;
        resolve(responseRequests);
      }, 1000);
    });
  }
}

export default RequestApi;
