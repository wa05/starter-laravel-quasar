export default ({ app, router, Vue }) => {
    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            // if (!Vue.auth.check() && to !== 'login') {
            //     next({
            //         name: 'login'
            //     });
            // } else {
            //     next();
            // }
          next();

        } else {
            next(); // make sure to always call next()!
        }
    })
}
