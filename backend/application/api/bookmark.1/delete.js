async ({ id }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.bookmark.delete(ctx, id),
    'deleted'
  );
