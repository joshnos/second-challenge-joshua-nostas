"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const PostController_1 = require("./controller/PostController");
exports.Routes = [{
        method: "get",
        route: "/posts",
        controller: PostController_1.PostController,
        action: "all"
    }, {
        method: "get",
        route: "/posts/:id",
        controller: PostController_1.PostController,
        action: "one"
    }, {
        method: "post",
        route: "/posts",
        controller: PostController_1.PostController,
        action: "save"
    }, {
        method: "delete",
        route: "/posts/:id",
        controller: PostController_1.PostController,
        action: "remove"
    }];
//# sourceMappingURL=routes.js.map