var is_add;

var id;
var title;
var link;
var icon;

var search_engin = 'baidu';

//+++++++控制编辑、增加按钮显示或隐藏+++++++//
var edit = false


function setHide() {
	$('.site-del').hide();
	$('.site-box-add').hide();
	$('.up-de-layout').hide();
	$('.login_out').hide();
}

setHide();

$('html').dblclick(function () {
	if (edit == false) {
		edit = true
		$('.site-del').show()
		$('.site-box-add').show()
		$('.login_out').show();
	}else {
		setHide();
		edit = false
	}
})
//+++++++控制编辑按钮显示或隐藏+++++++//

//删除功能
$('.site-del').click(function () {
	
	$.ajax({
		type: 'POST',
		contetType: 'application/json',
		url: '/delete',
		data: {
			'id': $(this).parent().attr('id')
		},
		success: function (result) {
			alert(result)
			window.location.reload()
		},
		error: function () {
			alert('请求失败')
		}
	});
})

//图标点击功能
$('.site-icon-text,.site-box>svg,.site-icon-img').click(function () {
	if (edit==false) {
		var url = $(this).parent().attr('link')
		// window.open(url)
		window.location.replace(url)
	}else {
		is_add = false;
		$('.bt_submit').text('更新数据')
		$('.up-de-layout').show();
		
		id = $(this).parent().attr('id');
		title = $(this).parent().attr('title');
		link = $(this).parent().attr('link');
		icon = $(this).parent().attr('icon');
		
		$('#title').val(title)
		$('#link').val(link)
		$('#icon').val(icon)
		
	}
})

//设置网站图标只有一个字
function setTitleOne() {
	var nn = document.getElementsByName('ss')
	for (var i = 0; i < nn.length; i++) {
		str = nn[i].innerText
		nn[i].innerText = str.substring(0, 1)
	}
}
setTitleOne()

//根据不同窗口大小自动排列每行图标个数
function setSiteBoxMargin() {
	var site_box_w = parseInt($('.site-box').width())
	var body_w = parseInt($('body').width())
	var margin;
	var row_box_number;
	
	console.log(body_w)
	if (body_w > 1000) {
		row_box_number = 15
	}else if (body_w > 900) {
		row_box_number = 14
	}else if (body_w > 800) {
		row_box_number = 13
	}else if (body_w >700) {
		row_box_number = 12
	}else if (body_w > 600) {
		row_box_number = 9
	}else if (body_w > 500) {
		row_box_number = 6
	}else if (body_w > 400) { //xr 414
		row_box_number = 5
	}else if (body_w > 300) {
		row_box_number = 4
	}else if (body_w > 200) {
		row_box_number = 3
	}
	
	margin =(body_w-row_box_number*site_box_w)/(row_box_number+1);
	
	$('.site-box-add').css('margin-left',margin+'px')
	$('.site-box').css('margin-left',margin+'px')
	$('.site-box').css('margin-bottom',margin+'px')
	//$('.site-layout').css('padding-top',margin+'px')
	
	
}
setSiteBoxMargin();

//计算新增、修改窗口的位置
function setUpAndDelPositon() {
	var layout = $('.up-de-layout')
	var layout_w = layout.outerWidth(true)
	var layout_h = layout.outerHeight(true)
	
	var body_w = $(window).width()
	var body_h = $(window).height()
	
	$('.up-de-layout').css('left',(body_w - layout_w)/2+'px')
	$('.up-de-layout').css('top',(body_h - layout_h)/2+'px')
	
}
setUpAndDelPositon()

//响应新增主页按钮
$('.site-box-add').click(function () {
	$('.bt_submit').text('新增数据')
	$('.up-de-layout').show()
	is_add = true;
});

//响应窗口关闭按钮
$('.up-de-layout-close').click(function () {
	setHide();
});

//响应窗口提交按钮
$('.bt_submit').click(function () {
	//响应新增按钮
	if (is_add == true) {
		
		$.ajax({
			type: 'POST',
			contetType: 'application/json',
			url: '/add',
			data: {
				'title': $('#title').val(),
				'link': $('#link').val(),
				'icon': $('#icon').val()
			},
			success: function (result) {
				alert(result)
				window.location.reload()
			},
			error: function () {
				alert('请求失败')
			}
		});
	}else {
		$.ajax({
			type: 'POST',
			contetType: 'application/json',
			url: '/update',
			data: {
				'id': id,
				'title': $('#title').val(),
				'link': $('#link').val(),
				'icon': $('#icon').val()
			},
			success: function (result) {
				alert(result)
				window.location.reload()
			},
			error: function () {
				alert('请求失败')
			}
		});
	}
});



//处理搜索框的建议搜索
$(".suggest").hide();
$('.search-input').keyup(function () {
	
	//获取框中的数据
    var $_messg = $(this).val();
	
	if ($_messg == '') {
		$(".suggest").hide();
		return
	}
	
    //发送Ajax请求
    $.ajax({
        url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&p=3&sid=&req=2&bs=%E7%81%AB%E8%BD%A6%E7%A5%A8%E8%AE%A2%E8%B4%AD%E7%BD%91%E7%AB%9912306&pbs=%E7%81%AB%E8%BD%A6%E7%A5%A8%E8%AE%A2%E8%B4%AD%E7%BD%91%E7%AB%9912306&csor=2&pwd=%E7%81%AB&cb=?",
        type:"get",
        dataType:"jsonp",
        data:{
            "wd":$_messg
        },
        success:function(data){
            //每次输入前都清空
            $(".suggest").empty();
			$(".suggest").show();
			
            //获取到的所有数据
            // console.log(data.g);

            for(var i = 0;i<data.g.length;i++){
                //创建li标签
                var $li = $("<li>");

                $li.text(data.g[i].q);

                $(".suggest").append($li)
            }
		   
		//成功获取数据后
		$('.suggest>li').click(function () {
			var s_text = $(this).text();
			$('.search-input').val(s_text)
		});
		
        },
        error:function () {
            console.log('失败了');
        }
    });
	
});

var s_engin = false
$('.s-engin').hide()
$('.search-select').click(function () {
	if (s_engin == true) {
		$('.s-engin').fadeToggle()
		s_engin = false
	}else {
		$('.s-engin').fadeToggle()
		s_engin = true
	}
	
});

//设置搜索引擎
$('.s-engin>li').click(function () {
	search_engin = $(this).attr('id')
	$('.s-engin').fadeToggle()
	s_engin = false
});


//点击按钮立即搜索
$('.search-button').click(function () 
{
	var s_text = $('.search-input').val();
	if (s_text == '') {
		return
	}else {
		if (search_engin == 'baidu') {
			window.location.replace('https://baidu.com/s?word='+s_text)
		}else if (search_engin == 'github') {
			window.location.replace('https://github.com/search?q='+s_text)
		}else if (search_engin == 'google') {
			window.location.replace('https://google.com/search?q='+s_text)
		}else if (search_engin == 'sougou') {
			window.location.replace('https://m.sogou.com/web/searchList.jsp?keyword='+s_text)
		}else if (search_engin == 'biying') {
			window.location.replace('https://www.bing.com/search?q='+s_text)
		}
		
		
	}
});

//搜索框输入内容时回车响应搜索
$(document).keyup(function(event){  
	if(event.keyCode ==13){  
		var s_text = $('.search-input').val();
		if (s_text == '') {
			return
		}else {
			if (search_engin == 'baidu') {
				window.location.replace('https://baidu.com/s?word='+s_text)
			}else if (search_engin == 'github') {
				window.location.replace('https://github.com/search?q='+s_text)
			}else if (search_engin == 'google') {
				window.location.replace('https://google.com/search?q='+s_text)
			}else if (search_engin == 'sougou') {
				window.location.replace('https://m.sogou.com/web/searchList.jsp?keyword='+s_text)
			}else if (search_engin == 'biying') {
				window.location.replace('https://www.bing.com/search?q='+s_text)
			}
		}
	}
});   
