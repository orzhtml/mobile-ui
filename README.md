# Mobile UI


## 演示地址

* pc: http://orzhtml.github.io/mobile-ui/
* mobile: http://orzhtml.github.io/mobile-ui/mobile.html

## less 目录结构说明：

* base[基础]
  * mixin[混合-fun]
  * ---- border.less            [边框]
  * ---- clearfix.less          [清浮动]
  * ---- icon-font.less         [字体icon]
  * ---- nowrap.less            [截取]
  * ---- rem.less               [rem标准]
  * ---- set-tap-color.less     [设置tap颜色]
  * ---- ......

  * base.less       [基础合并]
  * fn.less         [混合+变量合并]
  * icon-font.less  [字体icon]
  * rem.less        [rem标准]
  * reset.less      [重置]
  * variable.less   [变量]
    
* util[辅助类 - utilities]
  * animation.less  [动画] 
  * border.less     [边框]
  * clearfix.less   [清浮动]
  * nowrap.less     [截取]

* component[组件]
  * article.less  
  * button.less
  * dialog.less
  * form.less
  * list.less
  * panel.less
  * slide.less
  * tab.less
  * tag.less

* widgets[工具]
  * app.less
  * base.less
  * footer.less
  * global.less
  * go-top.less
  * header.less
  * menu.less
  * offcanvas.less 

* lolyUI.less   [最终输出文件]

## 目录文件规范：

    文件夹:
        暂时不需要新增文件夹，现有文件夹名字暂不变更
        
    文件:
        base 里面的 mixin 目录可以建相应混合文件
        component 里面的文件不能随意新增，需商定后才可以建
        util 里面的文件根据需要可以建相应的辅助类
        widgets 暂时不需要放文件
   
## 命名规范：  
   
    文件命名：单词于单词之间以中横线（-）为分割，不做驼峰，以便阅读。
    
    所有混合方法、class、变量、命名都要单词于单词之间以中横线（-）为分割 
    
    例如: 
         方法 [ .set-tap-color() ] 
         变量 [ @color-white ] 
         类   [ .ui-border-t ]
         
## 其他规范：

    @import 一定要再最顶上
    
    调用的方法放在顶上，例如：
    .btn {
        .set-tap-color();
        border-radius: @btn-border-radius;
    }
    
    variable.less 里面书写变量的时候，主体与子级应要空一行并TAB键缩紧，例如：
    // 字体颜色
    @color-black: #000;
    @color-white: #fff;

        // 灰度
        @color-gray-darker: lighten(@color-black, 13.5%);   // #222
        @color-gray-dark:   lighten(@color-black, 20%);     // #333
        
    它们变量和变量对齐，值和值对齐，注释和注释对齐，具体详情请移步 variable.less 观摩

    // 请做注释。。。我觉得还是有必要
    
#### 状态类：

|   单词    |    意思    |
| -------- | --------- |
| show     | 显示       |
| hide     | 隐藏       |
| current  | 当前状态    |
| active   | 激活状态    |
| checked  | 选中状态    |
| selected | 已选中状态  |
| disabled | 失效状态    |
| done     | 完成状态    |
| focus    | 聚焦状态    |
| blur     | 失去焦点状态 |

#### 约定的一些简写：

|   缩写  |    原单词   |
| ------ | ---------- |
| -s     | small      |
| -lg    | large      |
| -l     | left       |
| -r     | right      |
| -t     | top        |
| -b     | bottom     |
| -thumb | thumbnail  |
| -img   | images     |
| -nav   | navigation |
| -cnt   | content    |
| -hd    | header     |
| -bd    | body       |
| -ft    | footer     |
| -txt   | text       |
| -btn   | button     |
| -multi | 多个        |
| -info  | 信息内容     |

#### 一些常用的属性或模块：

|     单词     |   意思  |
| ----------- | ------- |
| -wrap       | 外层    |
| -default    | 默认样式 | 
| -pure       | 简版    |
| -border     | 带边框的 |
| -outline    | 带边框的 | 
| -halve      | 两等分   |
| -trisect    | 三等分   |
| -cover      | 通栏     |
| -tiled      | 平铺     |
| -vertical   | 垂直     |
| -horizontal | 横向     |
| -divider    | 分割     |
| -muted      | 弱的     | 
| -group      | 组的     |
| -info       | 信息     |
| -news       | 消息     |
| -success    | 成功的   |
| -warn       | 警告的   |
| -highlight  | 高亮的   |
| -item       | 子元素   |
| -title      | 标题     |
| -subtitle   | 小标题   |
| -state      | 状态     |
| -guide      | 引导性   |
| -link       | 链接     |
| -bar        | 横块     |

#### 只要词义表达了组件要实现的功能或者要表现出来的外观就可以了

#### 用 less 编写

#### 避免不必要的嵌套。只有在需要给父级元素增加样式并且同时存在多个子元素时才需要考虑嵌套。

## 总目录结构:

* dist
  * example
     * article.html
     * button.html
     * dialog.html
     * form.html
     * icon-font.html
     * list.html
     * panel.html
     * slide.html
     * tab.html
     * tag.html
     * mobile.html
     * example.css
     * index.html
     * index.css
     * index.js
    
  * css
     * lolyui.css
     * widgets
     * ---- app.css
     * ---- base.css
     * ---- footer.css
     * ---- go-top.css
     * ---- header.css
     * ---- menu.css
     * ---- offcanvas.css

  * js

* src
  * example
     * article.html
     * button.html
     * dialog.html
     * form.html
     * icon-font.html
     * list.html
     * panel.html
     * slide.html
     * tab.html
     * tag.html
     * mobile.html
     * example.less
     * index.html
     * index.less
     * index.js

  * less
     * base
         * mixin
         * ---- border.less
         * ---- clearfix.less
         * ---- icon-font.less
         * ---- nowrap.less
         * ---- rem.less
         * ---- set-tap-color.less
         * base.less
         * fn.less
         * icon-font.less
         * rem.less
         * reset.less
         * variable.less
     
     * component
         * button.less
         * dialog.less
         * form.less
         * list.less
         * panel.less
         * slide.less
         * tab.less
         * tag.less

      * util
         * animation.less
         * border.less
         * clearfix.less
         * nowrap.less

      * widgets
         * app.less
         * base.less
         * footer.less
         * go-top.less
         * header.less
         * menu.less
         * offcanvas.less

      * mobile-ui.less

    * js

END