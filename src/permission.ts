import { addRoutes, router } from "~/router";
import { hideFullLoading, showFullLoading, toast } from "~/composables/util";
import {getToken} from "~/composables/auth";

router.beforeEach(async (to, from, next) => {
    showFullLoading();
    const token = getToken();
    if (!token && to.path != "/login") {
        toast("请先登录", "error");
        return next({ path: "/login" });
    }
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error");
        return next({ path: from.path ? from.path : "/" });
    }
    let title = (to.meta.title ? to.meta.title : "") + "STEM视频网站后台";
    document.title = title;
});


router.afterEach((to, from) => hideFullLoading());
