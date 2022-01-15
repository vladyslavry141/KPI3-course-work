({
  access: 'public',
  method: async ({ token }) =>
    lib.utils.tryReturn(context, (ctx) =>
      domain.module.auth.restore(ctx, token)
    ),
});
