/**
 * Created by miao on 2016/1/20.
 */
(function( window , document ){

    'use strict';

    //��hotcss���ٸ������ռ䣬������Ϊʲô����Ҫ����׼������õ��ķ���������õ���ʱ��Ҫ�Լ�д��
    var hotcss = {};

    (function() {
        //����devicePixelRatio�Զ�����scale
        //������Ч����ƶ���1px����������⡣
        var viewportEl = document.querySelector('meta[name="viewport"]'),
            hotcssEl = document.querySelector('meta[name="hotcss"]'),
            dpr = window.devicePixelRatio || 1,
            maxWidth = 540,
            designWidth = 0;

        //����ͨ���Զ���nameΪhotcss��metaͷ��ͨ��initial-dpr��ǿ�ƶ���ҳ������
        if (hotcssEl) {
            var hotcssCon = hotcssEl.getAttribute('content');
            if (hotcssCon) {
                var initialDprMatch = hotcssCon.match(/initial\-dpr=([\d\.]+)/);
                if (initialDprMatch) {
                    dpr = parseFloat(initialDprMatch[1]);
                }
                var maxWidthMatch = hotcssCon.match(/max\-width=([\d\.]+)/);
                if (maxWidthMatch) {
                    maxWidth = parseFloat(maxWidthMatch[1]);
                }
                var designWidthMatch = hotcssCon.match(/design\-width=([\d\.]+)/);
                if (designWidthMatch) {
                    designWidth = parseFloat(designWidthMatch[1]);
                }
            }
        }

        document.documentElement.setAttribute('data-dpr', dpr);
        hotcss.dpr = dpr;

        document.documentElement.setAttribute('max-width', maxWidth);
        hotcss.maxWidth = maxWidth;

        if( designWidth ){
            document.documentElement.setAttribute('design-width', designWidth);
            hotcss.designWidth = designWidth;
        }

        var scale = 1 / dpr,
            content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

        if (viewportEl) {
            viewportEl.setAttribute('content', content);
        } else {
            viewportEl = document.createElement('meta');
            viewportEl.setAttribute('name', 'viewport');
            viewportEl.setAttribute('content', content);
            document.head.appendChild(viewportEl);
        }

    })();

    hotcss.px2rem = function( px , designWidth ){
        //Ԥ���㽫����JS���õ��ߴ磬���ṩһ������������JS�н�pxתΪrem��������ô���ġ�
        if( !designWidth ){
            //�������JS�д����õ��˷���������ֱ�Ӷ��� hotcss.designWidth ���������ͼ�ߴ�;
            //��������ڵڶ�������������������ͼ�Ƕ��
            designWidth = parseInt(hotcss.designWidth , 10);
        }

        return parseInt(px,10)*320/designWidth/20;
    }

    hotcss.rem2px = function( rem , designWidth ){
        //����һ��rem2px�ķ������÷���px2remһ�¡�
        if( !designWidth ){
            designWidth = parseInt(hotcss.designWidth , 10);
        }
        //rem����ΪС�������ﲻ����������
        return rem*20*designWidth/320;
    }

    hotcss.mresize = function(){
        //�ԣ�������Ǻ��ķ����ˣ���HTML����font-size���������ӡ�
        var innerWidth = window.innerWidth;

        if( hotcss.maxWidth && (innerWidth/hotcss.dpr > hotcss.maxWidth) ){
            innerWidth = hotcss.maxWidth*hotcss.dpr;
        }

        if( !innerWidth ){ return false;}

        document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';

    };

    hotcss.mresize();
    //ֱ�ӵ���һ��

    window.addEventListener( 'resize' , function(){
        clearTimeout( hotcss.tid );
        hotcss.tid = setTimeout( hotcss.mresize , 33 );
    } , false );
    //��resize��ʱ�����

    window.addEventListener( 'load' , hotcss.mresize , false );
    //��ֹ����ԭ���bug��load֮���ٵ���һ�Ρ�


    setTimeout(function(){
        hotcss.mresize();
        //��ֹĳЩ���͹��������첽�ٵ���һ��
    },333)

    window.hotcss = hotcss;
    //�����ռ䱩¶���㣬����Ȩ�����㣬����ô����ô����


})( window , document );