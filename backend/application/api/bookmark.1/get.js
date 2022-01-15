async ({ id }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.bookmark.get(ctx, id),
    'bookmark'
  );
