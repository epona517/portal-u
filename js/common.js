/**
 * common javascript
 */
var common = common || {};

common.init = function() {

	// common.loadMessage();
};

common.submit = function(action, params) {

	var urlParam = '';
	if (Array.isArray(params)) {
		urlParam = '/' + params.join('/')
	}
	var myself = $('#myself').val();
	var rootPath = $('#rootPath').val();
	var form = document.getElementById(myself + 'Form');

	console.log(rootPath + myself + action + urlParam);
	form.action = rootPath + '/' + myself + '/' + action + urlParam;
	form.submit();
};

common.isPressedEnter = function(e) {

	return e.keyCode == 13;
};


// dialog message
// --------------------------------------------------------

 /**
  * 画面読み込み時、サーバサイドメッセージが設定されていた場合
  * ダイアログメッセージを表示する。
  */
common.loadMessage = function() {

	if ($('#dialogMessage').size() !== 0) {
		common.popupMessage(
			$('#messageTitle').val(),
			$('#flashMessage').val()
		);
	}
}

/**
 * ダイアログを生成し、タイトルとメッセージを設定して、
 * ダイアログを表示する。
 *
 * @param {string} title ダイアログタイトル
 * @param {string} message ダイアログメッセージ
 * @param {} _buttons ダイアログのボタン設定
 */
common.popupMessage = function(title, message, _buttons) {

	var argsLen = arguments.length;
	if (argsLen < 3) {
		var _buttons = {
			'OK': function() {
				$(this).dialog('close');
			}
		}
	}

	$('#dialog')
		.dialog({
			width: 320,
			modal: true,
			position: {
				of : '#main-header',
				at: 'center top',
				my: 'center top'
			},
			autoOpen: false,
			show: {
				easing: 'swing',
				effect: 'blind'
			},
			hide: {
				duration: 300,
				easing: 'swing',
				effect: 'blind'
			},
			buttons: _buttons,
			title: common.getMessageTitle(title)
		})
		.html(message)
		.dialog('open');
};

common.getConfirmMessage = function($obj) {

	var message = '';
	// 本番環境確認メッセージ
	if ($obj.hasClass('jsCnfmGenuine')) {
		message = '本番環境へ接続します。<br>よろしいですか。';
	}

	return message;
}

common.getMessageTitle = function(key) {

	var title;
	switch (key) {
		case 'E':
			title = 'エラー'; break;
		case 'W':
			title = '注意'; break;
		case 'I':
			title = 'インフォメーション'; break;
		case 'Q':
			title = '確認'; break;
		default:
			title = 'メッセージ'; break;
	}
	return title;
}