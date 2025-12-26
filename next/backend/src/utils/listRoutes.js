function listRoutes(app) {
    const allRoutes = [];

    function scan(stack, prefix = "") {
        stack.forEach(layer => {

            // Normal route: GET /login
            if (layer.route && layer.route.path) {
                const methods = Object.keys(layer.route.methods).join(", ");
                allRoutes.push({
                    path: prefix + layer.route.path,
                    methods
                });
            }

            // Router-level middleware (/api)
            else if (layer.name === "router" && layer.handle.stack) {
                let newPrefix = prefix;

                // extract parent path from regexp
                const match = layer.regexp.toString().match(/\\\/(.+?)\\\//);
                if (match && match[1] !== '^') {
                    newPrefix += "/" + match[1];
                }

                scan(layer.handle.stack, newPrefix);
            }
        });
    }

    scan(app._router.stack);
    return allRoutes;
}

export default listRoutes;
