"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const postController_1 = require("./controller/postController");
exports.Routes = [{
        method: "get",
        route: "/posts",
        controller: postController_1.PostController,
        action: "all"
    }, {
        method: "get",
        route: "/posts/:id",
        controller: postController_1.PostController,
        action: "one"
    }, {
        method: "put",
        route: "/posts/:id",
        controller: postController_1.PostController,
        action: "update"
    }, {
        method: "post",
        route: "/posts",
        controller: postController_1.PostController,
        action: "save"
    }, {
        method: "delete",
        route: "/posts/:id",
        controller: postController_1.PostController,
        action: "remove"
    }];
//# sourceMappingURL=routes.js.map