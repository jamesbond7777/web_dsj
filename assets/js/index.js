$(function() {
    var layer = layui.layer
        // 调用getUserInfo 获取用户的基本信息
    getUserInfo();
    // 点击退出实现退出功能 
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清空本地存储中的token
            localStorage.removeItem('token');
            // 重新跳转到登录页面
            location.href = '/dashijian/login.html'
                // 关闭confirm询问框
            layer.close(index);
        });
    })
})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers  请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status != 0) {
                // 弹出提示框
                return layui.layer.msg('获取用户信息失败');
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },
        // // 无论成功还是失败  都会调用complete回调函数
        // complete: function(res) {
        //     console.log(res);
        //     // 在complete回调函数中可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页面
        //         location.href = '/dashijian/login.html'
        //     }
        // }

    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户昵称 优先获取user.nickname
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片图像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // 同时隐藏文本图像
        $('.text-avatar').hide();
    } else {
        // 隐藏图片图像
        $('.layui-nav-img').hide();
        // 获取用户昵称首字母并转化为大写
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}