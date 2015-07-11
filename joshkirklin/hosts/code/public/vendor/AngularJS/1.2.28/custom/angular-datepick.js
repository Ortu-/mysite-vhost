var Module = angular.module('datePicker', []);

Module.directive('dirDatepick', ['datepickService', function(datepickService){
	
	var pickData = datepickService;
	
	return function(scope, element, attrs){
		
		element.bind("focus", function(event){

			//get the picker
			var picker;
			if(pickData.elements.length > 0){
				picker = document.getElementById('date-picker');
			}
			else{
				picker = Module.makePicker();
			}
			picker.setAttribute('class', 'date-pick-active');
			
			//get element data
			var eIndx = -1;
			for(var i = 0; i < pickData.elements.length; i++){
				if(pickData.elements[i].id == attrs.id){ eIndx = i; }
			}
			if(eIndx == -1){
				pickData.elements.push({
					id: attrs.id,
					value: attrs.value,
					date: new Date()
				});
				eIndx = pickData.elements.length - 1;
			}
			
		});
		
		element.bind("blur", function(event){
			//hide the picker
			var picker = document.getElementById('date-picker');
			picker.setAttribute('class', 'date-pick-inactive');
		});
		
	};
}]);



Module.makePicker = function(){
	//make a new picker
	picker = document.createElement('div');
	picker.id = "date-picker";

	//append to view
	var mainView = document.getElementById('main-view');
	mainView.appendChild(picker);
	
	return picker;
}