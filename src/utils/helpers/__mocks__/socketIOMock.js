let EVENTS = {};

const emit = (event, ...args) => {
  EVENTS[event].forEach((func) => func(...args));
};

const on = (event, func) => {
  if (EVENTS[event]) {
    return EVENTS[event].push(func);
  }
  EVENTS[event] = [func];
};

export const socket = {
  on,
  emit,
  connect: () => {},
  disconnect: () => {},
};

export const io = {
  connect() {
    return socket;
  },
};

// to emulate server emit.
export const serverSocket = { emit, on }; // cleanup helper

export const cleanUp = () => {
  EVENTS = {};
};

export default io;
