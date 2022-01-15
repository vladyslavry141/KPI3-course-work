async ({ id, delta }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.account.update(ctx, id, delta),
    'updated'
  );
