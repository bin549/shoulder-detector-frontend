import { router } from "~/router";
import { hideFullLoading, showFullLoading, toast } from "~/composables/util";
import {getToken} from "~/composables/auth";

router.beforeEach((to, from, next) => {
    showFullLoading();
    const token = getToken();
    if (!token && to.path != "/login") {
        // toast("请先登录", "error");
        return next({ path: "/login" });
    }
    if (token && to.path == "/login") {
    //     // toast("请勿重复登录", "error");
        return next({ path: from.path ? from.path : "/" });
    }
    // let title = (to.meta.title ? to.meta.title : "") + "STEM视频网站后台";
    console.log("token: " + token)
    // document.title = title;
    hideFullLoading();
    next();
});


router.afterEach((to, from) => hideFullLoading());
