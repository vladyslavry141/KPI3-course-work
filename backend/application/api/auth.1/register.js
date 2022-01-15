({
  access: 'public',
  method: async (data) =>
    lib.utils.tryReturn(context, (ctx) =>
      domain.module.auth.register(ctx, data)
    ),
});
