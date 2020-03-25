import bookIcon from './icons/icons8-hotel-check-in-30.png';
import trip from './icons/icons8-trekking-26.png';
import accomodations from './icons/icons8-hotel-check-in-30.png';

export const requesterDashboard = {
  head: 'REQUESTER',
  topLeftHeader: {
    head: 'Trip requests',
    description: 'All my trip requests',
  },
  notifications: 0,
  links: [
    {
      name: 'My Bookings',
      path: 'booking',
      icon: bookIcon
    },
    {
      name: 'Trip Request',
      path: 'request',
      icon: trip
    },
    {
      name: 'Accommodations',
      path: 'accommodation',
      icon: accomodations
    },
  ]
}

export const managerDashboard = {
  head: 'MANAGER',
  topLeftHeader: {
    head: 'Trip requests',
    description: 'All trip requests',
  },
  notifications: 0,
  links: [
    {
      name: 'Trip request',
      path: 'request',
      icon: trip
    },
  ]
}