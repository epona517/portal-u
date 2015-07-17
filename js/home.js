/**
 * Portal for Project
 *
 * Coyright (c) 2015 Tadashi Murakami.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

/**
 * home javascript
 */
var home = home || {};

var newWin;

home.init = function() {

	// 初期処理
	// =============================================
	home.createNavigation();
	home.adjustFooterHeight();

	// イベント登録
	// =============================================

	// 【共通化】システムサイトアクセス
	$('.jsCmnAcsOutside').click(function() {
		home.commonLocateOutside($(this));
	});

	// リンクボタン押下時
	$('.jsLinkBtn').click(function() {
		home.locateOutside($(this));
	});

	// ローカルファイルリンク押下時
	$('.jsAcsInside').click(function() {
		home.locateInside($(this));
	});

	// ナビゲーション押下時
	$(document).on('click', '.nav_menu', function() {
		home.navigationToArticle($('.nav_menu').index(this));
	});
};

/**
 * Footer要素の高さを自動的に調整する
 */
home.adjustFooterHeight = function() {

	var lastArticleHeight = $('.jsInNav').last().outerHeight();
	var footerHeight = $('#main-footer').outerHeight();
	$('#main-footer').css('height', lastArticleHeight + footerHeight);
}

/**
 * ナビゲーションを動的に生成する	
 */
home.createNavigation = function() {

	var $inNavs = $('.jsInNav');

	if ($inNavs.size() < 0) {
		return;
	}

	// nav候補の数から、幅を計算する
	var width = Math.round(100000 / $inNavs.size()) / 1000;
	// nav候補のhtmlを吸い出しながら、メニューリストを作成する
	var navHtml = '';
	$inNavs.each(function(idx, obj) {
		navHtml += '<li class="nav_menu" style="width: ' + width + '%;"><span>'
				 + $(this).find('h1').html() + '</span></li>';
	});
	// navに設定
	$('#main-nav').find('ul').html(navHtml);

	// navの横幅を取得していく
	var $navTexts = $('.nav_menu').find('span');
	var widthArray = new Array();
	$navTexts.each(function() {
		widthArray.push($(this).outerWidth());
	});

	// navの横幅の最大値を取得する
	var max = -9999;
	for (var index = 0; index < widthArray.length; index++) {
		if (max < widthArray[index]) {
			max = widthArray[index];
		}
	}

	// すべてのnavに最小幅を設定する
	$('.nav_menu').each(function() {
		$(this).css("min-width", max + 20 + 'px');
	});
}

/**
 * ナビゲーション押下時、対象の要素までスクロールする
 * 
 * @param  {int} index ナビゲーションの番号
 */
home.navigationToArticle = function(index) {

	var gap = $('.jsInNav').eq(index).offset().top;
	gap -= common.adjustHeaderPadding();
	$('html,body').animate({ scrollTop: gap }, 'fast');
}

/**
 * 【共通化】システムサイトに新しいウィンドウでアクセスする
 * ※ ドメイン、パスをdataオブジェクトで指定
 * 
 * @param  {jQuery Object}
 */
home.commonLocateOutside = function($obj) {

	var domain = $obj.data('domain');
	var pass = $obj.data('pass');
	var url = domain + '/' + pass

	var message = common.getConfirmMessage($obj);
	if (!message) {
		window.open(url);
		return;
	}

	var _buttons = home.createConfirmButton(url);
	common.popupMessage('Q', message, _buttons);
}

/**
 * 外部HTTP(S)リンクへアクセスする
 * 
 * @param  {jQuery Object} $obj
 */
home.locateOutside = function($obj) {

	var url = $obj.data('href');
	window.open(url);
}

/**
 * 内部のディレクトリリンクへアクセスする
 * 
 * @param  {jQuery Object} $obj
 */
home.locateInside = function($obj) {

	var filePath = $obj.data('filePath');
	newWin = window.open('../' + filePath, 'newOpened');
	setTimeout('windowClose()', 500);
}

/**
 * 開いたウィンドウを閉じる
 */
function windowClose() {
	newWin.close();
}

/**
 * jQueryUIのボタンオブジェクトを作成する。（OK / Cancel）
 * 
 * @param  {string} url
 * @return {jQuery-ui buttons}
 */
home.createConfirmButton = function(url) {

	var _buttons = {
		'OK': function() {
			$(this).dialog('close');
			window.open(url);
		},
		'Cancel': function() {
			$(this).dialog('close');
		}
	};

	return _buttons;
}


