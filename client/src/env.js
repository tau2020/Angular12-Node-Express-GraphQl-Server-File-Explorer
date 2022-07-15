(function (window) {
  window.__env = window.__env || {};


  const port = process.env.PORT || 4200;

  window.__env.apiUrl = `http://localhost:${port}`;

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));