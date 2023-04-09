
var numberPlay = 0,
	numberWin = 0,
	presentResult = {};
fsPlay = true;

var arrPriceAll = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 7, 7];
var arrWin = [0, 0, 2, 2, 2, 3, 3, 3, 5, 5, 5, 6];
var arrFail = [1, 4, 7];

var fs_prices = [
	{
		gilf: true,
		name: '<h3>Ưu đãi 50%</h3><p>khi mua TV The Frame</p>',
		gift_url: 'images/gift_tv_the_frame.png',
		gift_url_shadow: 'images/gift_tv_the_frame_shadow.png',
		nameInText: 'Ưu đãi 50% khi mua TV The Frame',
		gift_type: 'fs_is_frame'
	},
	{
		gilf: false,
		name: 'Quay lại nào',
		gift_url: '',
		gift_url_shadow: '',
		nameInText: '',
		gift_type: ''
	},
	{
		gilf: true,
		name: '<h3>Ưu đãi 20%</h3><p>khi mua TV & điện gia dụng</p>',
		gift_url: 'images/gift_20_per_electric.png',
		gift_url_shadow: 'images/gift_20_per_electric_shadow.png',
		nameInText: 'Ưu đãi 20% khi mua TV & điện gia dụng',
		gift_type: 'fs_is_electric'
	},
	{
		gilf: true,
		name: '<h3>Ưu đãi 20%</h3><p>khi mua TV RU 7300</p>',
		gift_url: 'images/gift_20per_tv_ru_7300.png',
		gift_url_shadow: 'images/gift_20per_tv_ru_7300_shadow.png',
		nameInText: 'Ưu đãi 20% TV RU 7300',
		gift_type: 'fs_is_ru'
	},
	{
		gilf: false,
		name: 'Quay lại nào',
		gift_url: '',
		gift_url_shadow: '',
		nameInText: '',
		gift_type: '',
	},
	{
		gilf: true,
		name: '<h3>Ưu đãi 20%</h3> <p>khi mua máy giặt</p>',
		gift_url: 'images/gift_washing.png',
		gift_url_shadow: 'images/gift_washing_shadow.png',
		nameInText: 'Ưu đãi 1.000.000 khi mua máy giặt',
		gift_type: 'fs_is_washing',
	},
	{
		gilf: true,
		name: '<h3>1 cặp vé 2D <span>tại CGV</span></h3>',
		gift_url: 'images/gift_2d_cvg.png',
		gift_url_shadow: 'images/gift_2d_cvg_shadow.png',
		nameInText: '1 cặp vé 2D CGV (e ticket)',
		gift_type: 'fs_is_cgv'
	},
	{
		gilf: false,
		name: 'Quay lại nào',
		gift_url: '',
		gift_url_shadow: '',
		nameInText: '',
		gift_type: ''
	}
];

// Get info game
function getGameControl() {
	var email = localStorage.getItem('fs_email');
	var data = { value: email };
	// Cuong code
	// $.ajax({
	// 	cache: false,
	// 	dataType: 'json',
	// 	contentType: 'application/json; charset=utf-8',
	// 	type: 'POST',
	// 	url: webURLAjax + "/Register/GetUserPlayInfo",
	// 	data: JSON.stringify(data),
	// 	success: function (result) {
	// 		numberPlay = result.NumOfPlay;
	// 		numberWin = result.NumOfWin;
	// 		if (numberPlay == 0) {
	// 			localStorage.setItem('fs_email', '');
	// 		}
	// 		showDataCase();
	// 	},
	// 	error: function (err) {
	// 		numberPlay = 0;
	// 		numberWin = 0;
	// 		localStorage.setItem('fs_email', '');
	// 		showDataCase();
	// 	}

	// });

	//Quyet code
	numberPlay = 0;
	numberWin = 0;
	showDataCase();
}

$.fn.isInViewport = function () {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};

//Lazayload images
function ImgLazyLoad() {
	lazyImages = $('.cmPic.lazy');
	lazyImages.each(function (index, lazyImage) {
		if ($(lazyImage).isInViewport()) {
			$(lazyImage).attr('src', $(this).data("original"));
			$(lazyImage).removeClass('lazy');
		}
	});
}

//Lazayload background
function BgLazyLoad() {
	lazyBgs = $('.cmBg.lazy');
	lazyBgs.each(function (index, lazyBg) {
		//if ($(lazyBg).isInViewport()) {
		$(lazyBg).css({ 'background-image': 'url(' + $(this).data("original") + ')' });
		$(lazyBg).removeClass('lazy');
		//}
	});
}

function ActionAfterRouleteComplete(price, playCount) {
	var $fsCurBox = $('.fs_show');
	$('.fs_overlay_inr > div').attr('style', '');

	if (price.gilf) { //Win
		$('.fs_pic_follow').attr('src', price.gift_url);
		$('.fs_pic_follow_shadow').attr('src', price.gift_url_shadow);
		$('.fs_txt_follow').html(price.name);

		$('.fs_login').addClass(price.gift_type);

		setTimeout(function () {

			$fsCurBox.fadeOut(500, function () {

				$fsCurBox.removeClass('fs_show');

				//Show gilf box
				$('.fs_gilt').addClass('fs_show');

				setTimeout(function () { //Show faq box

					$fsCurBox = $('.fs_show');
					$('.fs_overlay_inr > div').attr('style', '');

					$fsCurBox.fadeOut(500, function () {
						var email = localStorage.getItem('fs_email');
						$fsCurBox.removeClass('fs_show');
						if (email != undefined && email != "") {
							$('.fs_win').addClass('fs_show');
						}
						else {
							$('.faq_first').addClass('fs_show');
						}


					});

				}, 3000);
			});

		}, 1500);

	} else { //Lose
		$fsCurBox.fadeOut(500, function () {

			$fsCurBox.removeClass('fs_show');
			$('.fs_overlay_inr > div').attr('style', '');

			if (playCount == 0) {// Lose and Gameover
				$('.fs_game_over').addClass('fs_show');
			} else {
				//Show lose box
				$('.fs_lose').addClass('fs_show');

			}

		});
	}
}

function commonEvents() {

	$('.fs_close_overlay, #fs_btn_cancel').click(function (e) {
		e.preventDefault();
		$('.fs_overlay').removeClass('fs_active');
		$('body').removeClass('fs_no_scroll');
	});

	//Game
	var $fs_roulete = $('.fs_roulette').fortune(fs_prices);

	$('.fs_spinner').on('click', function () {

		if (fsPlay) {
			fsPlay = false;

			var playCount = parseInt($('.fs_number_play').first().text());

			if (playCount > 0) {
				playCount--;
			}

			$('.fs_number_play').text(playCount);

			$('.fs_game_box').addClass('fs_playing');

			$fs_roulete.spin().done(function (price) {
				presentResult = price;
				var email = localStorage.getItem('fs_email');
				if (email != undefined && email != "") {
					var urlParams = location.search;
					var browser = navigator.appCodeName + ", " + navigator.appName;
					var presentName = presentResult.nameInText;
					var isSuccess = presentResult.gilf;
					var data = {
						Email: email,
						HttpRequestString: urlParams,
						Browser: browser,
						PresentName: presentName,
						Success: isSuccess
					};
					//Cuong code
					// $.ajax({
					// 	cache: false,
					// 	dataType: 'json',
					// 	contentType: 'application/json; charset=utf-8',
					// 	type: 'POST',
					// 	url: webURLAjax + "/Register/UpdateRouleteForUser",
					// 	data: JSON.stringify(data),
					// 	success: function (result) {
					// 		ActionAfterRouleteComplete(price, playCount);
					// 	}
					// });
					//End Cuong
					//Quyet code
					ActionAfterRouleteComplete(price, playCount);
					//End Quyer
				}
				else {
					ActionAfterRouleteComplete(price, playCount);
				}

			});
		}
	});

	// Answer first
	$('.faq_first').on('click', 'input[type="checkbox"]', function () {
		var $fsCurBox = $('.fs_show');
		$('.fs_overlay_inr > div').attr('style', '');

		$fsCurBox.fadeOut(500, function () {
			$fsCurBox.removeClass('fs_show');
			$('.faq_second').addClass('fs_show');
		});

	});

	// Answer second
	$('.faq_second').on('click', 'input[type="checkbox"]', function () {
		var $fsCurBox = $('.fs_show');
		$('.fs_overlay_inr > div').attr('style', '');

		$fsCurBox.fadeOut(500, function () {
			$fsCurBox.removeClass('fs_show');
			$('.fs_login').addClass('fs_show');
		});

	});

	//Continute to play
	$('#fs_btn_continute, #fs_btn_try_again').on('click', function () {
		var $fsCurBox = $('.fs_show');
		$('.fs_overlay_inr > div').attr('style', '');
		fsPlay = true;

		$fsCurBox.fadeOut(500, function () {
			$fsCurBox.removeClass('fs_show');
			$('.fs_game').addClass('fs_show');
		});

	});


	function findFromErrorArray(arr, valueCheck) {
		var result = null;
		arr.find(function (value, index) {
			if (value.Type == valueCheck) {
				result = value;
			}
		});
		return result;
	}

	var isProcess = false;
	//Send info 
	$('#fs_btn_register').on('click', function () { //Succcess 
		if (isProcess == true) {
			return;
		}
		isProcess = true;
		var name = $("#fs_txt_username").val();
		var phone = $("#fs_txt_phone").val();
		var email = $("#fs_txt_email").val();
		var chkTerm = $("#fs_check_condition:checked").val();
		var checkSpaceMax = $("#fs_check_spacemax:checked").val();
		var checkTimeMax = $("#fs_check_timeMax:checked").val();
		var checkSideMax = $("#fs_check_sidemax:checked").val();
		var check90 = $("#fs_check_90:checked").val();
		var check100 = $("#fs_check_100:checked").val();
		var check110 = $("#fs_check_110:checked").val();
		var answer1 = "";
		var hasAnswer1 = false;
		var answer2 = "";
		var hasAnswer2 = false;
		if (checkSpaceMax) {
			answer1 = $("#spnCheckSpaceMask").html();
			hasAnswer1 = true;
		}
		else if (checkTimeMax) {
			answer1 = $("#spnCheckTimeMask").html();
			hasAnswer1 = true;
		}
		else if (checkSideMax) {
			answer1 = $("#spnCheckSideMask").html();
			hasAnswer1 = true;
		}
		if (check90) {
			answer2 = $("#spnCheck90").html();
			hasAnswer2 = true;
		}
		else if (check100) {
			answer2 = $("#spnCheck100").html();
			hasAnswer2 = true;
		}
		else if (check110) {
			answer2 = $("#spnCheck110").html();
			hasAnswer2 = true;
		}
		var hasAnswer = false;
		if (hasAnswer1 && hasAnswer2) {
			hasAnswer = true;
		}

		var urlParams = location.search;
		var browser = navigator.appCodeName + ", " + navigator.appName;
		if (presentResult == null) {
			isProcess = false;
			return;
		}
		var presentName = presentResult.nameInText;
		var isSuccess = presentResult.gilf;

		var data = {
			FullName: name,
			Phone: phone,
			Email: email,
			HttpRequestString: urlParams,
			Browser: browser,
			PresentName: presentName,
			Success: isSuccess,
			Answer1: answer1,
			Answer2: answer2,
			HasAnswer: hasAnswer
		};
		$("#grpName").removeClass("fs_show_error");
		$("#grpEmail").removeClass("fs_show_error");
		$("#grpPhone").removeClass("fs_show_error");
		$("#spnErrorNameMess").html("");
		$("#spnErrorEmailMess").html("");
		$("#spnErrorPhoneMess").html("");
		$('#errorSummary').removeClass('fs_show');
		// $("#divErrorSummary").hide();
		// $("#errorMsg").html("");
		var isErrorWithControl = false;
		var errorMesStr = "";
		if (name == undefined || name == null || name == "") {
			$("#grpName").addClass("fs_show_error");
			$("#spnErrorNameMess").html("<p>Bạn phải nhập vào họ tên</p>");
			isErrorWithControl = true;
		}

		if (phone == undefined || phone == null || phone == "") {
			$("#grpPhone").addClass("fs_show_error");
			$("#spnErrorPhoneMess").html("<p>Bạn phải nhập vào số điện thoại</p>");
			isErrorWithControl = true;
		}

		if (email == undefined || email == null || email == "") {
			$("#grpEmail").addClass("fs_show_error");
			$("#spnErrorEmailMess").html("<p>Bạn phải nhập vào số email</p>");
			isErrorWithControl = true;
		}

		if (chkTerm == undefined || chkTerm == null || chkTerm == false) {
			//$("#divErrorEmail").addClass("fs_show_error");
			errorMesStr += "<span>Bạn phải đồng ý với các điều khoản và điều kiện</span>";
			isErrorWithControl = true;
		}

		if (isErrorWithControl) {
			alert(errorMesStr);
			// $("#errorMsg").html(errorMesStr);
			// $("#divErrorSummary").show(); 
			isProcess = false;
			return;
		}
		isErrorWithControl = false;
		errorMesStr = "";
		// Cuong code
		// $.ajax({
		// 	cache: false,
		// 	dataType: 'json',
		// 	contentType: 'application/json; charset=utf-8',
		// 	type: 'POST',
		// 	url: webURLAjax + "/Register/Register",
		// 	data: JSON.stringify(data),
		// 	success: function (result) {
		// 		if (result.Error != null && result.Error.length > 0) {
		// 			isErrorWithControl = false;
		// 			errorMesStr = "";
		// 			var isNameError = findFromErrorArray(result.Error, 1);
		// 			if (isNameError != undefined && isNameError != null) {
		// 				$("#grpName").addClass("fs_show_error");
		// 				$("#spnErrorNameMess").html("<p>" + isNameError.Error + "</p>");
		// 				isErrorWithControl = true;
		// 			}

		// 			var isPhoneError = findFromErrorArray(result.Error, 2);
		// 			if (isPhoneError != undefined && isPhoneError != null) {
		// 				$("#grpPhone").addClass("fs_show_error");
		// 				$("#spnErrorPhoneMess").html("<p>" + isPhoneError.Error + "</p>");
		// 				isErrorWithControl = true;
		// 			}
		// 			var isEmailError = findFromErrorArray(result.Error, 3);
		// 			if (isEmailError != undefined && isEmailError != null) {
		// 				$("#grpEmail").addClass("fs_show_error");
		// 				$("#spnErrorEmailMess").html("<p>" + isEmailError.Error + "</p>");
		// 				isErrorWithControl = true;
		// 			}
		// 			if (!isErrorWithControl) {
		// 				var isSystemError = findFromErrorArray(result.Error, -1);
		// 				if (isSystemError != undefined && isSystemError != null) {


		// 					var errMsg = "";
		// 					if (isSystemError.Error == "SystemError") {
		// 						errMsg = "<h2>Rất tiếc, đã có lỗi xảy ra <br>Vui lòng quay lại sau.</h2>";
		// 					}
		// 					else if (isSystemError.Error == "NotAnswerQuestion") {
		// 						errMsg = "<h2>Bạn chưa trả lời 2 câu hỏi</h2>";
		// 					}
		// 					else if (isSystemError.Error == "PlayExceed") {
		// 						errMsg = "<h2>Lượt quay hôm nay của bạn hết rồi. <br>Hãy quay lại vào ngày mai nhé!</h2>";
		// 					}
		// 					else if (isSystemError.Error == "WinExceed") {
		// 						errMsg = "<h2>Số lần trúng tối đa trong ngày là 3</h2>";
		// 					}
		// 					else {
		// 						errMsg = "<h2>Rất tiếc, đã có lỗi xảy ra <br>Vui lòng quay lại sau.</h2>";
		// 					}
		// 					$("#spnErrorSummaryMsg").html(errMsg);
		// 					var $fsCurBox = $('.fs_show');
		// 					$('.fs_overlay_inr > div').attr('style', '');

		// 					$fsCurBox.fadeOut(500, function () {
		// 						$fsCurBox.removeClass('fs_show');
		// 						$('#errorSummary').addClass('fs_show');
		// 					});
		// 					isErrorWithControl = true;
		// 				}
		// 			}

		// 			isProcess = false;
		// 		} else {
		// 			isProcess = false;
		// 			//$("#btnFinish").click();
		// 			localStorage.setItem('fs_email', email);
		// 			var $fsCurBox = $('.fs_show');
		// 			$('.fs_overlay_inr > div').attr('style', '');

		// 			$fsCurBox.fadeOut(500, function () {
		// 				$fsCurBox.removeClass('fs_show');
		// 				$('.fs_win').addClass('fs_show');
		// 			});
		// 		}
		// 	},
		// 	error: function (err) {
		// 		isProcess = false;
		// 	}
		// });
		//End Cuong
		//Quyet code
		var $fsCurBox = $('.fs_show');
		$('.fs_overlay_inr > div').attr('style', '');

		$fsCurBox.fadeOut(500, function () {
			$fsCurBox.removeClass('fs_show');
			$('.fs_win').addClass('fs_show');
		});
		//End Quyet

	});

	//Hide erro by click
	$('.fs_group').on('click', function () {
		$(this).removeClass('fs_show_error');
		$(this).find('input[type="text"]').focus();
	});

	//Focus input
	$('.fs_form input').focus(function (e) {
		$(this).parent().removeClass('fs_show_error');
	}).focusout(function (e) {
	});
}

function onScroll() {
	ImgLazyLoad();
	BgLazyLoad();
}

function Resize() {

}

function showDataCase() {

	var cgvProduct = "2D CGV";
	var dataForCgv = { value: cgvProduct };
	var totalNumOfCgv = 0;
	// Cuong Code
	// $.ajax({
	// 	cache: false,
	// 	dataType: 'json',
	// 	contentType: 'application/json; charset=utf-8',
	// 	type: 'POST',
	// 	url: webURLAjax + "/Register/GetNumOfRecordWithPresentName",
	// 	data: JSON.stringify(dataForCgv),
	// 	success: function (result) {
	// 		totalNumOfCgv = result;
	// 		if (totalNumOfCgv >= 100) {
	// 			arrPriceAll = arrPriceAll.filter(function (value, index) {
	// 				return value !== 6;
	// 			});
	// 			arrWin = arrWin.filter(function (value, index) {
	// 				return value !== 6;
	// 			});
	// 		}
	// 		$('.fs_overlay').addClass('fs_active');

	// 		if (numberPlay == 0) { //New gammer
	// 			$('.fs_game').addClass('fs_show');
	// 		} else if (numberPlay > 0 && numberPlay < 5) {

	// 			$('.fs_overlay').addClass('fs_active');

	// 			if (numberPlay == 0) { //New gammer
	// 				$('.fs_game').addClass('fs_show');
	// 			} else if (numberPlay > 0 && numberPlay < 5) {


	// 			} else { // Gameover
	// 				$('.fs_game_over').addClass('fs_show');
	// 			}
	// 		}

	// 	}});
	// Quyet Code
	$('.fs_overlay').addClass('fs_active');

	if (numberPlay == 0) { //New gammer
		$('.fs_game').addClass('fs_show');
	} else if (numberPlay > 0 && numberPlay < 5) {

	} else { // Gameover
		$('.fs_game_over').addClass('fs_show');
	}
}

$(window).on('scroll', onScroll);

$(window).on('resize', Resize);

$(window).on('load', function () {

	$('.fs_main').animate({ 'opacity': 1 }, 500, function () {
		onScroll();
		$('body').addClass('fs_no_scroll');
		commonEvents();
	});

});


(function () {
	getGameControl();
	onScroll();
})();