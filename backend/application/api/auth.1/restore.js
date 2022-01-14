({
  access: 'public',
  method: async (data) =>
    lib.utils.tryReturn(context, data, domain.module.auth.restore),
});
