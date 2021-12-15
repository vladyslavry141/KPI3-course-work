({
  access: 'public',
  method: async ({ login, password }) =>
    domain.module.auth.restore(login, password),
});
