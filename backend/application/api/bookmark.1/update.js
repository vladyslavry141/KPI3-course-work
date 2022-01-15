async ({ id, delta }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.bookmark.update(ctx, id, delta),
    'updated'
  );
