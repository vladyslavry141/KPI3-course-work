({
  access: 'public',
  method: async ({ login, password }) =>
    lib.utils.tryReturn(context, (ctx) =>
      domain.module.auth.signin(ctx, login, password)
    ),
});
