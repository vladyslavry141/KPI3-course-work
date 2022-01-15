async (data) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.bookmark.create(ctx, data),
    'id'
  );
