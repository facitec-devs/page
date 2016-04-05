$(function(){
	var postTemplate;
	$.get('template/post-template.html' ,function(data){
		postTemplate = data;
		$('section').append(postTemplate);
	});

	$.ajax({
		type: 'GET',
		url: 'api/posts',
		success:function(data){
			for(var i = 0;i<data.length;i++){
				var dato = data[i];
				var post =$(postTemplate);
				post.find('#username').append(dato.username);
				post.find('#text').append(dato.text);
				post.find('img').attr('src',dato.avatar);
				post.find('#favorite button').click(getFavoriteEvent(dato, post));
				$('section').append(post);

			}

		},
		error:function(){
			console.log('Error...');
		}

	});


});
function getFavoriteEvent(dato, post){
	var evento = function(event){
		if(!dato.favorite){
			post.find('#favorite button').attr('class','btn btn-danger');
			dato.favorite = true;
		}else{
			post.find('#favorite button').attr('class', 'btn btn-default');
			dato.favorite = false;
		}
		post.find('#favorite button').blur();
		console.log(dato);

	};
	return evento;
}