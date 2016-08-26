/*!
 * Author: Vincent Chen
 * Date: 15-12-20 下午2:57
 * Contact way: QQ77642304
 * Detail:
 * Url: http://orzhtml.com/
 */

$(".pre-code").each(function () {
    var $self = $(this);
    $("#" + $self.data("id")).text($self.html()); // 将script脚本里的代码写入 code
});

// 全部搞完后
hljs.initHighlightingOnLoad();

$(function(){
    var tpl = $('#template').html();
    $('#example').on('click',function(){
        $.dialog({
            "id":'exampleDialog',
            "class_name": 'example',
            "title":'title',
            "content": tpl,
            "button": ["确认"]
        });
    });

    $('#example2').on('click',function(){
        $.dialog({
            "close":true,
            "id":'exampleDialog2',
            "class_name": 'example',
            "content": tpl,
            "button": ["确认","取消"]
        });
    });

    $('#example3').on('click',function(){
        var dia = $.dialog({
            "close": false,
            "id":'exampleDialog3',
            "class_name": 'example',
            "content": '验证码已发送,请查看手机短信.',
            "button": false
        });

        setTimeout(function () {
            dia.dialog('hide');
        }, 3000);
    });

    $('#example4').on('click', function () {
        var $this = $(this);
        var name = $this.data('dropdown');
        var tpl = $('#' + name).html();
        var $input = $this.find('input[type="hidden"]');
        var input_val = $input.val();

        var dia = $.dialog({
            "class_name": 'ui-dialog-actions',
            "content": tpl,
            "button": false,
            "speed": 300
        });

        // 循环赋值高亮
        dia.find('.J_selData').each(function () {
            var $self = $(this);
            if ($self.data('val') == input_val) {
                $self.addClass('active');
                return false;
            }
        });

        // 点击触发选项
        dia.find('.J_selData').on('click', function () {
            var $this = $(this);
            var text = $this.text();
            var val = $this.attr('data-val');
            var obj = $('[data-rel="' + id + '"]');

            obj.find('.text').removeClass('placeholder').text(text);
            obj.find('input').val(val);
            $this.addClass('active').siblings().removeClass('active');
            dia.removeClass('show-visible');

            setTimeout(function () {
                dia.dialog("hide");
            }, 300);

        });
    });

    var example5_html = '<div class="ui-dialog-content">限制最大高度，带滚动条</div>';
    $('#example5').on('click',function(){
        $.dialog({
            "close":true,
            "id":'exampleDialog5',
            "class_name": 'ui-dialog-list',
            "title":'标题',
            "content": example5_html,
            "button": []
        });
    });

    var tpl = $('#template').html();
    $('#form_example').on('click', function () {
        $.dialog({
            "id": 'exampleDialog',
            "class_name": 'ui-dialog-form', // 必须
            "title": '请输入验证码',
            "content": tpl,
            "button": ["确认"]
        });
    });

    var swiper = new Swiper('.banner1', {
        pagination: '.banner1 .swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });

    var swiper_title = new Swiper('.banner2', {
        pagination: '.banner2 .swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30
    });

    var $window = $(window);
    var $body   = $(document.body);

    var navHeight = $('.navbar').outerHeight(true) + 10;

    $body.scrollspy({
        target: '.bs-sidebar',
        offset: navHeight
    });

    $window.on('load', function () {
        $body.scrollspy('refresh');
    });

    $('.bs-docs-container [href=#]').click(function (e) {
        e.preventDefault();
    });

    // back to top
    setTimeout(function () {
        var $sideBar = $('.bs-sidebar');

        $sideBar.affix({
            offset: {
                top: function () {
                    var offsetTop      = $sideBar.offset().top;
                    var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10);
                    var navOuterHeight = $('.bs-docs-nav').height();

                    return (this.top = offsetTop - navOuterHeight - sideBarMargin);
                }, bottom: function () {
                    return (this.bottom = $('.bs-footer').outerHeight(true));
                }
            }
        })
    }, 100);

    $('.doc-demo-link').hover(function () {
        $(this).find('.doc-qrcode').show();
    }, function () {
        $(this).find('.doc-qrcode').hide();
    });

    $('.doc-qrcode').each(function () {
        var $this = $(this);
        $this.qrcode({
            "text": $this.parent().attr('href')
        });
    });

    var window_height = window.screen.height;
    $(".ui-dialog-tab-nav li").on("click",function(){
        var $ui_tab = $(this).closest(".ui-dialog-tab");
        var $ui_tab_content = $ui_tab.find(".ui-dialog-tab-content");
        console.log($ui_tab);
        var data_type=$(this).data("type");
        if($(this).hasClass("current")){
            $(this).removeClass("current");
            $ui_tab_content.hide();
            $ui_tab_content.find(".ui-dialog-tab-item").hide();
            $("body").css("overflow","auto");
        } else {
            $(this).addClass("current").siblings().removeClass("current");
            $ui_tab_content.show();
            $ui_tab_content.find(".ui-dialog-tab-item").hide();
            $ui_tab_content.find(".ui-dialog-tab-item#"+data_type).show();
            $("body").css("overflow","hidden");
        }
        $ui_tab_content.css("height",window_height-$ui_tab_content.offset().top);
    })
});