
$(window).load(function() {

	var InfiniteRotator =
	{
		init: function()
		{
			var initialFadeIn = 1000;
			var itemInterval = 5000;
			var fadeTime = 2500;
			var numberOfItems = $('.rotating-item').length;
			var currentItem = 0;

			$('.rotating-item').eq(currentItem).fadeIn(initialFadeIn);

			var infiniteLoop = setInterval(function(){
				$('.rotating-item').eq(currentItem).fadeOut(100);

				if(currentItem == numberOfItems -1){
					currentItem = 0;
				}else{
					currentItem++;
				}
				$('.rotating-item').eq(currentItem).fadeIn(fadeTime);

			}, itemInterval);
		}
	};

	InfiniteRotator.init();

});
