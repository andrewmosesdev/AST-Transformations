const { get } = require("lodash");

const object = {
  a: {
    z: {
      y: "something",
    },
  },
  b: {},
};

function main() {
  // works for standard usage
  const bad_traversal = get(object, "a.z.y", "default value");
  // returns: const good_traversal = object?.a?.z?.y ?? "default value";

  // need to update for non-standard usage
  const alt_arg_2 = get(object, [0, "b.c"], "default value");

  // ignores same name identifiers for different usage
    
  // mock http client
  function ignoreThisFunction() {
    return get("requestUrl", "headers");
  }

  // mock webpack stuff
  const ignoreThisObject = {
    get: function get() {
      return "boop";
    },
  };
}

main();
