({
  access: 'public',
  method: async ({ login, password, email }) =>
    domain.module.auth.register(login, password, email, context),
});
