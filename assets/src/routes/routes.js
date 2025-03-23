const Routes = (function() {
  const routes = [{"name":"index","path":"/","controller":"SentinelWeb.PageController","params":[],"action":"home","method":"GET"},{"name":"registration.new","path":"/registration","controller":"SentinelWeb.Web.RegistrationController","params":[],"action":"new","method":"GET"},{"name":"register.create","path":"/register","controller":"SentinelWeb.Web.RegistrationController","params":[],"action":"create","method":"POST"},{"name":"sign_in.new","path":"/sign_in","controller":"SentinelWeb.Web.SignInController","params":[],"action":"new","method":"GET"},{"name":"sign_in.create","path":"/sign_in","controller":"SentinelWeb.Web.SignInController","params":[],"action":"create","method":"POST"},{"name":"monitors.index","path":"/monitors","controller":"SentinelWeb.Web.MonitorController","params":[],"action":"index","method":"GET"},{"name":"monitors.edit.edit","path":"/monitors/:id/edit","controller":"SentinelWeb.Web.MonitorController","params":["id"],"action":"edit","method":"GET"},{"name":"monitors.new.new","path":"/monitors/new","controller":"SentinelWeb.Web.MonitorController","params":[],"action":"new","method":"GET"},{"name":"monitors.show","path":"/monitors/:id","controller":"SentinelWeb.Web.MonitorController","params":["id"],"action":"show","method":"GET"},{"name":"monitors.create","path":"/monitors","controller":"SentinelWeb.Web.MonitorController","params":[],"action":"create","method":"POST"},{"name":"monitors.update","path":"/monitors/:id","controller":"SentinelWeb.Web.MonitorController","params":["id"],"action":"update","method":"PATCH"},{"name":"monitors.update","path":"/monitors/:id","controller":"SentinelWeb.Web.MonitorController","params":["id"],"action":"update","method":"PUT"},{"name":"monitors.delete","path":"/monitors/:id","controller":"SentinelWeb.Web.MonitorController","params":["id"],"action":"delete","method":"DELETE"}];

  function replaceParams(path, params = {}) {
    let result = path;
    const routeParams = {...params};
    delete routeParams._query;

    // Keep track of used route parameters
    const usedParams = new Set();

    Object.keys(routeParams).forEach(key => {
      if (result.includes(`:${key}`)) {
        result = result.replace(`:${key}`, String(routeParams[key]));
        usedParams.add(key);
      }
    });

    const queryParams = {...params};
    const explicitQueryParams = queryParams._query || {};
    delete queryParams._query;

    // Remove used route parameters from query params
    usedParams.forEach(key => delete queryParams[key]);

    const allQueryParams = {...queryParams, ...explicitQueryParams};
    const queryString = Object.keys(allQueryParams).length
      ? '?' + new URLSearchParams(Object.fromEntries(
          Object.entries(allQueryParams).filter(([_, v]) => v != null)
        )).toString()
      : '';

    return result + queryString;
  }

  function route(name, params = {}) {
    const route = routes.find(r => r.name === name);
    if (!route) throw new Error(`Route '${name}' not found`);

    return replaceParams(route.path, params);
  }

  function path(name, params = {}) {
    return route(name, params);
  }

  function method(name) {
    const route = routes.find(r => r.name === name);
    if (!route) throw new Error(`Route '${name}' not found`);
    return route.method;
  }

  function hasRoute(name) {
    return routes.some(r => r.name === name);
  }

  return {
    routes,
    route,
    path,
    method,
    hasRoute,
    replaceParams
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Routes;
} else {
  window.Routes = Routes;
}
