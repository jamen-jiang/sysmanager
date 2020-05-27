import router from '@/router';
const setRouter = menus => {
  if (menus.length > 0) {
    menus.forEach(menu => {
      if (menu.Children.length <= 0) {
        if (menu.Type == 1) {
          var route = {
            path: menu.VueUri,
            component: null,
            name: menu.Name,
          };
          if (menu.VueUri != '/') {
            var vueUri = menu.VueUri;
            if (vueUri.substring(0, 1) == '/') vueUri = menu.VueUri.substring(1);
            let array = vueUri.split('/');
            let url =
              array[0].substring(0, 1).toUpperCase() +
              array[0].substring(1) +
              '/' +
              array[1].substring(0, 1).toUpperCase() +
              array[1].substring(1);
            route['component'] = resolve => require([`@/views/${url}`], resolve);
          }
          router.options.routes[0].children.push(route);
        }
      } else {
        setRouter(menu.Children);
      }
    });
    router.addRoutes(router.options.routes);
  }
};
export { setRouter };
