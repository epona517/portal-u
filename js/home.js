/**
 * home javascript
 */
var home = home || {};

var newWin;

home.init = function() {

	// 【共通化】システムサイトアクセス
	$('.jsCmnAcsOutside').click(function() {
		home.commonLocateOutside($(this));
	});

	$('.jsLinkBtn').click(function() {
		home.locateOutside($(this));
	});

	$('.jsAcsInside').click(function() {
		home.locateInside($(this));
	});
};


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

home.locateOutside = function($obj) {

	var url = $obj.data('href');
	window.open(url);
}

home.locateInside = function($obj) {

	var filePath = $obj.data('filePath');
	newWin = window.open('../' + filePath, 'newOpened');
	// alert(win.name);
	// win.focus();
	// win.close();
	setTimeout('windowClose()', 500);
}

function windowClose() {
	// win.close();
	newWin.close();
	// alert('aaa');
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