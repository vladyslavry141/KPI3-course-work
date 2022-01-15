async (data) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.account.get(ctx, data),
    'account'
  );
