/**
 * 
 * 
 * <script src="js/jquery-1.12.3.min.js"></script>
 * 
 * 
 * <link rel="stylesheet" href="/css/default.min.css">
 * <script src="/js/highlight.min.js"></script>
 * 
 * 
 * <body onload='init_snippets()'>
 * <pre><code data-snippetId="first" data-file="http://localhost:9292/asguard/test.cpp">test</code></pre>
 * 
 */

function get(url){
	var loader = $.get( url, function() {
		//console.log( "success" );
		})
		.done(function() {
			//console.log( "done" );
		})
		.fail(function(err) {
			alert("error reading: " + url + err);
		})
		.always(function() {
		//console.log( "complete" );
		});
	return loader;
}

function load(url,callback){
	//console.log( "loadTasks" );
	var loader = get(url);
	loader.done(function(data){
		callback(data);
	});	
};

function loadto(url,snippetId,target,callback){
	var x;
	load(url,function(file){
		//var target = document.getElementById("text");
		
		var starttag = '#snippet_begin:'+snippetId;
		var stoptag = '#snippet_end:'+snippetId;
		
		var start = file.indexOf(starttag);
		var stop = file.indexOf(stoptag);
		
		if (start ==-1){
			target.innerHTML = "could not find snippet start tag " + starttag + "<br>in " + url;
		}
		if (stop ==-1){
			target.innerHTML = "could not find snippet tag " + stoptag + "<br>in " + url;
		}
		console.log(starttag);
		console.log(stoptag);
		var snippet = file.substring(start,stop);
		
		//remove potential \r
		//snippet = snippet.replace(/(\r)/gm,"");
		var lines = snippet.split("\n");
		
		//remove tag lines
		snippet = lines.slice(1,-1);
		snippet = snippet.join("\n");
			
		console.log(snippet);
		//search for snippet start of id
		
		//extract code
		console.log(target);
		target.innerHTML = snippet;
		callback(target);
	});
	
}

function init_snippets(){
	$("pre code").each(function(key, value){
		var file = value.getAttribute("data-file");
		var id = value.getAttribute("data-snippetId");
		loadto(file,id,value,function(target){
			hljs.highlightBlock(target);
		});
	})
}