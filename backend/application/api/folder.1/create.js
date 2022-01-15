async (data) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.folder.create(ctx, data),
    'id'
  );
