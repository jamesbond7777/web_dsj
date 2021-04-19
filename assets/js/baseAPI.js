// 注意：每次调用$.get  $.post  $.ajax的时候都会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前，先统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // console.log(options.url);
    // 统一为有权限的接口设置 headers 请求头
    // 判断options.url里有没有/my/路径 
    if (options.url.indexOf('/my/') !== -1) {
        // 如果有才给设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // console.log(res);
        // 在complete回调函数中可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/dashijian/login.html'
        }
    }
})