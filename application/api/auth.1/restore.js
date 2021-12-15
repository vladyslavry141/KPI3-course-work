({
  access: 'public',
  method: async ({ token }) => domain.module.auth.restore(token),
});
