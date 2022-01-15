async ({ id }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.folder.delete(ctx, id),
    'deleted'
  );
