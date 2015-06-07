$(function () {
	$('body').on('click submit', 'input[type="submit"]', function (e) {		
		e.preventDefault();
		var hasError = false;
		$(this).closest('form').find('.required').each(function(){
			if($(this).val().trim().length == 0) {
				$(this).addClass('error');
				$(this).next('.error-icon').show();
				hasError = true;
				e.preventDefault();
			}
		});

		if(!hasError) {
			//no error, so time to ajax call
			$('.mask #msg').text('Please Wait...');
			$('.mask').show();

			var formID = $(this).closest('form').attr('id');
			//console.log(formID);
			//if it is signup form, call function doSignUp() 
			if(formID == 'signUpForm') {
				doSignUp('signUpForm');
			}			
		}
	});

	$('body').on('keyup blur', 'input.required', function () {
		if($(this).val().trim().length == 0) {
			$(this).addClass('error');
			$(this).next('.error-icon').show();
		} else {
			$(this).removeClass('error');
			$(this).next('.error-icon').hide();
		}
	});

	/******** ALL FUNCTIONS ********************/

	//SignUp Entry point when all form fields are ok
	function doSignUp(formID) {
		var dataObj = makeDataObj(formID);
		dataObj["_id"] = dataObj["chosenEmail"];
		//console.log('logging dataObj');
		//console.log(dataObj);

		//ajax post
		var ajaxObj = {};
		ajaxObj.url = $('#'+formID).attr('action');
		ajaxObj.methodType = $('#'+formID).attr('method');
		ajaxObj.dataObj = dataObj;
		ajaxObj.callback = function (data) {
			//console.log(data);
			$('.mask').hide();
			resetFields(formID);

			if(data.status == 'insert_success') {
				$('#'+ formID + ' .statusMsg .label').hide();
				$('#'+ formID + ' .label-success').show();
			} else {
				$('#'+ formID + ' .statusMsg .label').hide();
				$('#'+ formID + ' .label-danger').show();
			}
		};

		doAjax(ajaxObj);
	}

	//iterate over the entire form and make json obj with input fields
	function makeDataObj(formID) {
		var dataObj = {};
		//collect data from each input field of this form
		$('#'+formID+' input').each(function(){
			var inputType = $(this).attr('type');
			if(inputType == 'radio') {
				if($(this).is(':checked')) {
					dataObj[$(this).attr('name')] = $(this).val();
				}
			} else if (inputType == 'submit' || inputType == 'button') {
				//no need to do anything
			} else {
				dataObj[$(this).attr('name')] = $(this).val();
			}			
		});

		return dataObj;
	}

	//do ajax calls
	function doAjax (ajaxObj) {
		$.ajax({
			url: ajaxObj.url,
			type: ajaxObj.methodType,
			data: ajaxObj.dataObj
		}).done(function(data){
			ajaxObj.callback(data);
		});
	}

	//reset fields
	function resetFields(formID, hideError) {
		var hideError = hideError || false;
		$('#'+formID+' input:not([type="submit"])').val('');
		if(hideError) {
			$('#'+formID+' .statusMsg .label').hide();
		}	
	}
})