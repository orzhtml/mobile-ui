$(function(){
    // 默认模板
    var _dialogTpl =
        '<div class="ui-dialog <%=class_name%>" ' +
        '       <% if (id) { %>' +
        '       id="<%=id%>"' +
        '       <% } %>' +
        '   >' +
        '   <div class="ui-dialog-cnt">' +

        '       <div class="ui-dialog-hd">' +
        '           <% if (close) { %>' +
        '           <a class="icon icon-close" data-role="close"></a>' +
        '           <% } %>' +
        '           <% if (title) { %>' +
        '           <div class="title"><%=title%></div>' +
        '           <% } %>' +
        '       </div>' +

        '       <div class="ui-dialog-bd">' +
        '           <%=content%>' +
        '       </div>' +
        '       <% if (button) { %>' +
        '       <div class="ui-dialog-ft ui-btn-group">' +
        '       <% for (var i = 0; i < button.length; i++) { %>' +
        '           <% if (i == select) { %>' +
        '           <button type="button" data-role="button" class="select" id="dialogButton<%=i%>"><%=button[i]%></button>' +
        '           <% } else { %>' +
        '           <button type="button" data-role="button" id="dialogButton<%=i%>"><%=button[i]%></div>' +
        '           <% } %>' +
        '       <% } %>' +
        '       </div>' +
        '       <% } %>' +
        '   </div>' +
        '</div>';

    // 默认参数
    var defaults = {
        id: '',
        class_name: '',
        close: false,
        title: '',
        content: '',
        button: ['确认'],
        select: 0,
        speed: 0,
        allowScroll: false,
        callback: function () {
        }
    };

    // 构造函数
    var Dialog = function (el, option, isFromTpl) {

        this.option = $.extend({}, defaults, option);
        this.element = $(el);
        this._isFromTpl = isFromTpl;
        this.button = $(el).find('[data-role="button"]');
        this.$close = $(el).find('[data-role="close"]');
        this.$html = $('html');
        this.$body = $('body');
        this.scrollPos = {x: window.scrollX, y: window.scrollY};
        this._bindEvent();
        this.toggle();
    };

    Dialog.prototype = {
        _bindEvent: function () {
            var self = this;
            self.button.on("click", function () {
                var index = $(self.button).index($(this));
                // self.option.callback("button",index);
                var e = $.Event("dialog:action");
                e.index = index;
                self.element.trigger(e);
                self.hide.apply(self);
            });

            self.$close.on("click", function () {
                self.hide.apply(self);
            });

            self.element.on('click.dialog', function (e) {
                var $target = $(e.target);

                if ($target.hasClass('ui-dialog-cnt')) {
                    return;
                }

                if ($target.parents('.ui-dialog-cnt').first().length) {
                    return;
                }

                e.stopImmediatePropagation();

                self.hide.apply(self);
            });

            self.$html.on('keydown.dialog', function (e) {
                if (e.keyCode === 27) {
                    self.hide.apply(self);
                }
            });
        },
        toggle: function () {
            if (this.element.hasClass("show")) {
                this.hide();
            } else {
                this.show();
            }
        },
        show: function () {
            var self = this;
            // self.option.callback("show");
            self.element.trigger($.Event("dialog:show"));

            self.element.addClass("show");

            setTimeout(function () {
                self.element.addClass("show-visible");
            }, 0);

            this.option.allowScroll && self.element.on("touchmove", _stopScroll);

            self.$body.css({
                'position': 'fixed',
                'width': window.innerWidth,
                'height': $(window).height()
            });

            self.$html.css('margin-top', self.scrollPos.y * -1);
        },
        hide: function () {
            var self = this;
            // self.option.callback("hide");
            self.element.trigger($.Event("dialog:hide"));
            self.element.off("touchmove", _stopScroll);

            self.element.removeClass("show-visible");

            setTimeout(function () {
                self._isFromTpl && self.element.remove();
            }, self.option.speed);

            self.element.off('click.dialog');
            self.$html.off('.dialog');

            self.$body.css({
                'position': '',
                'width': '',
                'height': '',
                'margin-left': '',
                'margin-right': ''
            });
            self.$html.css('margin-top', '');
            window.scrollTo(self.scrollPos.x, self.scrollPos.y);
        }
    };

    // 禁止冒泡
    function _stopScroll() {
        return false;
    }

    function Plugin(option) {

        return $.adaptObject(this, defaults, option, _dialogTpl, Dialog, "dialog");
    }

    $.fn.dialog=$.dialog= Plugin;
});