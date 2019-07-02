(function ($) {
    function TurnPage(options) {
        const o = options;
        this.wrap = o.wrap;
        this.cur = o.cur || 1;   // 当前页码 current page
        this.all = o.all || 5;   // 总页码
        this.changePageFun = o.changePageFun || null;   // 页面处理函数接口
        this.width = $(window).width();
        if (this.cur > this.all) {
            console.error('page error,页数异常');
            return false;
        }
        this.createDom();
        this.initStyle();
        this.bindEvent();
    }

    //创建Dom
    TurnPage.prototype.createDom = function () {
        $(this.wrap).empty();   // 频繁操作dom，每次操作之前清空
        const ellipsis = $('<span>•••</span>');
        const num = this.width > 768 ? 2 : 1;
        let dom = $('<ul class="turnPage_"></ul>');
        // 上一页
        if (this.cur > 1) {
            dom.append($('<li class="prev-page_">上一页</li>'));
        } else {
            dom.remove('.prev-page_');
        }
        //页码差距超过3
        if (this.cur !== 1 && this.cur - 2 > 1) {
            dom.append($('<li class="page-number_">1</li>'))
        }
        if (this.cur - 2 > 2) {
            dom.append(ellipsis);
        }
        // 左右2页
        for (let i = this.cur - num; i <= this.cur + num; i++) {
            if (i > 0 && i <= this.all) {
                let domLi = $(`<li class="page-number_">${i}</li>`);
                if (i === this.cur) {
                    domLi.addClass('cur-page_');
                }
                dom.append(domLi);
            }
        }
        // 当前页与总页数相差3 以上 加点
        if (this.all - this.cur > 3) {
            dom.append(ellipsis);
        }
        //  当前页 与总页数 相差大于2 显示最后一页
        if (this.cur + 2 < this.all) {
            $(`<li class="page-number_">${this.all}</li>`).appendTo(dom);
        }
        if (this.cur < this.all) {
            dom.append($('<li class="next-page_">下一页</li>'));
        } else {
            dom.remove('.next-page_');
        }
        dom.appendTo($(this.wrap));
    };
    // 初始化样式
    TurnPage.prototype.initStyle = function () {
        if (this.width >= 768) {
            $('.turnPage_ li', this.wrap).css({
                padding: '6px 12px',
                margin: '0 5px',
                fontSize: '14px'
            });
        } else if (this.width < 350) {
            $('.turnPage_ li', this.wrap).css({
                padding: '2px 3px',
                margin: '0 2px',
                fontSize: '12px'
            });
        } else {
            $('.turnPage_ li', this.wrap).css({
                padding: '3px 6px',
                margin: '0 5px',
                fontSize: '16px'
            });
        }
        $('.turnPage_', this.wrap)
            .css({
                padding: 0,
                margin: 0,
                listStyle: 'none',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            })
            .find('li')
            .css({
                display: 'inline-block',
                cursor: 'pointer',
                backgroundColor: '#6a5acd',
                color: '#fff',
                borderRadius: '6%'
            })
            .end()
            .find('span').css({
            color: '#6a5acd'
            })
            .end()
            .find('li.cur-page_')
            .css({
                backgroundColor: '#fff',
                color: '#6a5acd',
                border: '1px solid #6a5acd'
            })
    };
    //绑定事件
    TurnPage.prototype.bindEvent = function () {
        const self = this;
        $('.prev-page_', self.wrap).click(e => {
            this.cur--;
            this.change();
        });
        $('.next-page_', self.wrap).click(e => {
            this.cur++;
            this.change();
        });
        $('.page-number_', self.wrap).click(function (e) {
            const i = Number($(this).text());
            self.cur = i;
            self.change();
        });
    };
    TurnPage.prototype.change = function () {
        this.createDom();
        this.initStyle();
        this.bindEvent();
        $.type(this.changePageFun) === 'function' && this.changePageFun(this.cur, this.all);
    };
    // 组件接口
    $.fn.extend({
        turnPage: function (options) {
            options.wrap = this;//保存父级
            new TurnPage(options);
            return this;
        }
    })
}(window.jQuery || window.$));