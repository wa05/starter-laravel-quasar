const routes = [
  {
    path: "/panel",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: 'dashboard',
        component: () => import("pages/main/Dashboard.vue"),
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    path: "/",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/auth/login.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "recuperar-contraseña",
        name: "recover-password",
        component: () => import("pages/auth/RecoverPassword.vue"),
        meta: { requiresAuth: false },
      },
      {
        // para poner la nueva contraseña
        path: "nueva-contraseña/:token",
        name: "new-password",
        component: () => import("pages/auth/NewPassword.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "registrarse",
        name: "register",
        component: () => import("pages/auth/register.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "contacto",
        name: "contact",
        component: () => import("pages/auth/contact.vue"),
        meta: { requiresAuth: false },
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
