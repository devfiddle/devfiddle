var editor = null ;
var ace_editor = null; 

$(function(){

    var container = document.getElementById("jsoneditor");
    var options = {};
    
    editor = new JSONEditor(container, options);
    
    
    
    $(document)
        .on('change', '#json_editor, #txtInput', function() {
            applyJson();
        })
        .on('keyup', '#json_editor, #txtInput', function() {
            applyJson();
        })
        .on('blur', '#json_editor, #txtInput', function() {
            applyJson();
        })
        .on('click' , '[data-action="beautify"]', function(){
            beautify();
            return false;
        })
        .on('click' , '[data-action="uglify"]', function(){
            uglify();
            return false;
        })
        .on('click' , '[data-action="save"]', function(){
            $.post('/api/json', {
                code : ace_editor.getValue()
            }, function(json) {
                
                if(json && json.id) {
                    console.log(json);
                    // location.href = '/json/' + json.id;
                }
                console.log(json);
            })
            return false;
        })
    ;

    ace_editor = ace.edit("json_editor");
    ace_editor.getSession().setMode("ace/mode/json");

    applyJson();
    
    // var json = editor.get();



});


var getContent = function() {
    return (ace_editor != null) ? ace_editor.getValue():$('#txtInput').val() ;
}


var setContent = function(content) {
    return (ace_editor != null) ? ace_editor.setValue(content):$('#txtInput').val(content);
}

var applyJson = function() {
    var json = null ;
    
    var content = getContent();
    
    
    try {
        json = JSON.parse(content);
        editor.set(json);
        $('#jsoneditor .json-editor-error').hide();
    }catch (err){
        $('#jsoneditor .json-editor-error').show();
        editor.set('##');
    }
    
}


var beautify = function() {
    setContent(JSON.stringify(JSON.parse(getContent()), null, 2))
}

var uglify = function() {
    setContent(JSON.stringify(JSON.parse(getContent())));
}