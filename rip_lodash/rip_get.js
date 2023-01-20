// WIP -- replacing instances of get(object, string | array, default_value) w/ object?.path ?? default_value

module.exports = function (file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root
    .find(j.CallExpression, {
      callee: {
        name: "get"
      },
      arguments: (args) => {
        return (
          args.length === 3 &&
          j.Identifier.check(args[0]) &&
          j.Literal.check(args[1])
        );
      }
    })
    .forEach((path) => {
      const { arguments: args } = path.node;
      const [obj, pathString, defaultValue] = args;
      let newPath = obj;
      const pathArr = pathString.value.split(".");

      pathArr.forEach((p, i) => {
        newPath = j.optionalMemberExpression(newPath, j.identifier(p));
      });

      const newExpression = j.logicalExpression("??", newPath, defaultValue);
      j(path).replaceWith(newExpression);
    });
  return root.toSource();
}