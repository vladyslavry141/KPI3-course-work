async ({ id }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.folder.getByFolder(ctx, id),
    'data'
  );
