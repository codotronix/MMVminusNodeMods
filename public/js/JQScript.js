$(function () {

/***** SUBMIT BUTTON CLICK VALIDATION *****/
	$('body').on('click submit', 'input[type="submit"]', function (e) {		
		var jqFormObj = $(this).closest('form');
		e.preventDefault();
		var hasError = false;
		//check all required fields
		jqFormObj.find('.required').each(function(){
			if($(this).val().trim().length == 0) {
				$(this).addClass('error');
				$(this).next('.error-icon').show();
				hasError = true;
				e.preventDefault();
			}
		});
		validateEmail(jqFormObj);
		//confirm that the form has no error
		if(!hasError && jqFormObj.find('.error').length == 0) {
			//no error, so time to ajax call
			$('.mask #msg').text('Please Wait...');
			$('.mask').show();

			var formID = $(this).closest('form').attr('id');
			
			//if it is signup form, call function doSignUp() 
			if(formID == 'signUpForm') {
				doSignUp('signUpForm');
			}			
		}
	});
///////////////////////////////////////////////////////////////

/***************** REQUIRED FIELDS VALIDATIONS *****************/
	$('body').on('keyup blur', '.required', function () {
		if($(this).val().trim().length == 0) {
			$(this).addClass('error');
			$(this).next('.error-icon').show();
		} else {
			$(this).removeClass('error');
			$(this).next('.error-icon').hide();
		}
	});
///////////////////////////////////////////////////////////////
	
/************** REPASSWORD VALIDATION ************************/
	/*assumes that form has only 2 input[type="password"], first one
	having .password class and 2nd one having .repassword class*/
	$('body').on('keyup blur', '.repassword', function () {
		if($(this).val() != $(this).closest('form').find('.password').val()) {
			$(this).addClass('error');
			$(this).next('.error-icon').show();
		} else {
			$(this).removeClass('error');
			$(this).next('.error-icon').hide();
		}
	});
///////////////////////////////////////////////////////////////

/****************** EMAIL VALIDATION ************************/
	function validateEmail (jqFormObj) {
		jqFormObj.find('.email').each(function(){
			var value = $(this).val();
			if(/^[a-z._-]{1,}@[A-Z_-]{1,}[.]{1}[A-Z._-]{1,}$/gi.test(value)) {
				$(this).removeClass('error');
				$(this).next('.error-icon').hide();
			} else {
				$(this).addClass('error');
				$(this).next('.error-icon').show();
			}

		});
	}
//////////////////////////////////////////////////////////////

/******************* ALL FUNCTIONS ***************************/

	//SignUp Entry point when all form fields are ok
	function doSignUp(formID) {
		var dataObj = makeDataObj(formID);
		dataObj["chosenEmail"] = dataObj["chosenEmail"].toLowerCase();
		dataObj["_id"] = dataObj["chosenEmail"];		

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