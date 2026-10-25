const APPLICATION_EVENTS = Object.freeze({
  DASHBOARD_REFRESH: "dashboard:refresh",
  PRODUCTS_CHANGED: "products:changed",
  SUPPLIERS_CHANGED: "suppliers:changed"
});

const emitApplicationEvent = (eventName) => {
  document.dispatchEvent(new CustomEvent(eventName));
};

export { APPLICATION_EVENTS, emitApplicationEvent };
