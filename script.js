var done1;
var done2;

$(function(){
 
    $("#button").click(function(){
            
        var array1 = [];
        var array2 = [];
        
        var artist1 = $("#band1").val();
        var artist2 = $("#band2").val();
        
        done1 = false;
        done2 = false;
        
        $("#results").text("");
        
        var req1 = $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist1.toLowerCase() + "&api_key=3cd12571266ede5f37845d3bf2c4b7dd&limit=500&format=json", function(json) {
            $.each(json.similarartists.artist, function(i, item) {
                array1.push(item.name);         
            });
        });
    
        var req2 = $.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist2.toLowerCase() + "&api_key=3cd12571266ede5f37845d3bf2c4b7dd&limit=500&format=json", function(json) {
            $.each(json.similarartists.artist, function(i, item) {
                array2.push(item.name);         
            });
        });
        
        req1.done(function(){
            done1 = true;
        });
        
        req2.done(function(){
            done2 = true;
        });
        
        waitfordone(function(){
            var results = array1.filter(value => -1 !== array2.indexOf(value));
        
            for(var i=0;i<results.length;i++){
                $("#results").append(results[i] + "<br/>")
            }
        });    
        
    });

});

function waitfordone(func) {
    if(!(done1 && done2)) {
       setTimeout(waitfordone, 100, func); /* this checks the flag every 100 milliseconds*/
    } else {
      func();
    }
}