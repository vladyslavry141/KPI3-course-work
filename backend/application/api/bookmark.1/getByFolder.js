async ({ id }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.bookmark.getByFolder(ctx, id),
    'data'
  );
