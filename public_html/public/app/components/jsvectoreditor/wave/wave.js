  var editor = null;

function jsonparse(str){
  return eval("("+str+")"); //using JSON.parse throws errors with the new compressed format
}

isPlayback = function(){
  //hack for the time being
  //return false;
  
  if((new Date).getTime()/1000 < 1254471241 + 592653 + 592653 + 592653){ //10 / 2 / 2009 @ 3:14 
    //wave is broken: this is a hack
    if(wave && wave.getState && wave.getState() && wave.getState().get){
      return wave.getState().get("${playback}");
    }else{
      return false;
    }
  }
  
  if(wave_get("FORCE_OVERRIDE_PLAYBACK") == "TRUE"){
    return true;
  }
  return wave.isPlayback()
}


function unlock_gui(){
  var locks = get_subkeys("locked:");
  for(var i = 0; i < locks.length; i++){
    wave_set("locked:"+locks[i], 'DEL/'+(new Date()).getTime());
  }
  humanMsg.displayMsg("<b>Unlocked "+locks.length+" shapes.</b> Remember to garbage collect to clear the remaining useless data.")
}
function subkey_assoc(name){
  for(var i = 0, arr = {}, keys = get_subkeys(name); i < keys.length; i++){
    arr[name+keys[i]] = wave_get(name+keys[i])
  }
  return arr
}

function listlocks(){
  //alert(get_subkeys("locked:").join("\n"));
  humanMsg.displayMsg("<pre>"+JSON.stringify(subkey_assoc("locked:"),null,2)+"</pre>");
}

function garbagecollect(){
    var keys = wave.getState().getKeys()
    var state = {}
    for(var i = 0; i < keys.length; i++){
      if(wave_get(keys[i]).indexOf("DEL/") == 0){
        state[keys[i]] = null;
      }
    }
    humanMsg.displayMsg("<pre>"+JSON.stringify(state,null,2)+"</pre>")
    wave.getState().submitDelta(state)
}
  function resetGadget(){
    var keys = wave.getState().getKeys()
    var state = {}
    for(var i = 0; i < keys.length; i++){
      state[keys[i]] = 'DEL/'+(new Date()).getTime();//null;
    }
    wave.getState().submitDelta(state)
  }
  
  function index_of(v,a){
    for(var i=a.length;i--&&a[i]!=v;);
    return i
  }
  
  function unlock_all(){
    var locks = get_subkeys("locked:");
    for(var i = 0; i < locks.length; i++){
      wave_set("locked:"+locks[i], null);
    }
  }
  
  function get_subkeys(name){
    var allkeys = wave.getState().getKeys();
    var subkeys = []
    for(var i = 0; i < allkeys.length; i++){
      if(allkeys[i].indexOf(name) == 0){
        subkeys.push(allkeys[i].substr(name.length))
      }
    }
    return subkeys
  }
  
  var tempdelta = {};
  var queued = false;
  function wave_set(row, value){
     var val = wave_get(row);
     if(val != value){
      if(typeof val == "string" && val.indexOf("DEL/") == 0){
        if((new Date()).getTime() - parseInt(val.substr(4)) < 1337*5){
          return; //dont change if deleted recently
        }
       }
     
     
      tempdelta[row] = value;
      if(queued == false){
        queued = true;
        setTimeout(function(){
          wave.getState().submitDelta(tempdelta)
          tempdelta = {};
          queued = false;
        },1000)
      }
     }
  
  }
  
  function wave_get(row){
    return wave.getState().get(row)
  }
  
  var lastfail = 0;
  function playback_fail(){
      var lastlock = 0;
    
    
  if(isPlayback()){
  if(lastfail < (new Date).getTime() - 10000){
  
  humanMsg.displayMsg("Wave is reporting that it is in Playback mode. Editing has been disabled.");
          lastfail = (new Date).getTime();
  }
  }
  }
  
  function is_locked(name){
    //return index_of(name,get_subkeys("locked:")) != -1;
    
    var state = wave_get("locked:"+name);
    
    if(state == null){
        //alert("State is Null")
        return false;
    }
    
    var user = state.split("!t")[0];
    var time = parseInt(state.split("!t")[1]);
    
    //never lock what is mine
    if(user == wave.getViewer().getId()){
      //alert("Locked By MEEEEE");
      return false
    }
    
    //unlock if owner is dead.
    var people = wave.getParticipants()
    for(var i = 0; i < people.length; i++){ //loop peoples
      if(people[i].getId() == user){
        if(time > (new Date).getTime() - (1000*60)){
          return user
        }else{
          //alert("Past Timeout"+state.split("!t")[1]+"::"+time+"sdafjlsdfjalskdf"+((new Date).getTime() - (1000*60)))
          return false;
        }
        //alert("Uh, not lawked")
        return false
      }
    }
    //alert("Uh, not lawked + duh internets broke")
    return false
  }
  
  
  
  function lock_shape(name){
    
    //console.log("Locking:",name)
    wave_set("locked:"+name, wave.getViewer().getId()+"!t"+(new Date).getTime());
  }
  
  function unlock_shape(name){
    
    //console.log("Unlocking:",name)
    wave_set("locked:"+name, null); //delete
  }
  
  
  function stateChanged(){
    var keys = get_subkeys("data:");
    
    if(isPlayback()){
    editor.deleteAll()
    
       for(var i = 0; i < keys.length; i++){
        var text = wave_get("data:"+keys[i]);
        
        //console.log("newshape:",keys[i])
        //console.log("data",text)
        if(typeof text == "string" && text.indexOf("DEL/") == 0){
            continue;
        }
        try {
        var json = jsonparse(text);
        
        loadShape(json,true)
        }catch(err){
          humanMsg.displayMsg("<b>Error JSON parsing</b>"+err.message)
        }
       }
    }else{
    
    for(var i = 0; i < keys.length; i++){
      
      //if(editor.getShapeById(keys[i]) == null){
        
        //if new shape
        var text = wave_get("data:"+keys[i]);
        
        //console.log("newshape:",keys[i])
        //console.log("data",text)
        if(typeof text == "string" && text.indexOf("DEL/") == 0){
          if((new Date()).getTime() - parseInt(text.substr(4)) < 5000){
            //oh noes deleted
            //alert("del"+i)
            editor.deleteShape(editor.getShapeById(keys[i]))
            //alert('delete'+keys[i])
          }
          
            continue;
        }
        
        try {
          var json = jsonparse(text);
        }catch(err){
          humanMsg.displayMsg('Error in JSON parsing '+err.message+"\n"+text)
        }  
        try {
          if(editor.getShapeById(keys[i]) == null){
            loadShape(json)
            //alert('load'+keys[i])
          }else if(!editor.is_selected(editor.getShapeById(keys[i]))){
            loadShape(json,true,true)
            //alert('load2'+keys[i])
          }
        
        }catch(err){
          //alert('Render '+err.message+"\n"+text)
        } 
        
    }
    
    
    }
    
  }
  
  function showState(){
    var state = wave.getState().toString();
    humanMsg.displayMsg("<b>State Length:</b> "+state.length)
    alert(state);
  }
  
  //stolen from an unreleased version of the ajax animator
  //which interestingly enough, I made. 
  //also the purpose of VectorEditor is for the ajax animator
  //so why am i citing myself?
  
  

  loadShape = function(shape, noattachlistener, animate){
    shape = Ax.decompress_attr(shape);
  
    var instance = editor//instance?instance:Ax.canvas
    if(!shape || !shape.type || !shape.id)return;
    
	  var newshape = null, draw = instance.draw, is_created;
	  //editor
    if(!(newshape=editor.getShapeById(shape.id))){
	  if(shape.type == "rect"){
	    newshape = draw.rect(0, 0,0, 0)
	  }else if(shape.type == "path"){
	    newshape = draw.path("M0,0")
	  }else if(shape.type == "image"){
      newshape = draw.image(shape.src, 0, 0, 0, 0)
    }else if(shape.type == "ellipse"){
      newshape = draw.ellipse(0, 0, 0, 0)
    }else if(shape.type == "text"){
      newshape = draw.text(0, 0, shape.text)
    }
    }else{
      is_created = true
    }
    
    var nobj = {}
    for(var i in shape){
      if((","+attr.join(",")+",").indexOf(","+i+",") != -1){
        //delete shape[i];
        nobj[i] = shape[i]
      }
    }
	  if(newshape){
      if(!animate && !is_created){
        newshape.animate(nobj, 314,function(){
            newshape.attr(shape)
        })
      }else{
        newshape.attr(shape)
      }
	    newshape.id = shape.id
	    newshape.subtype = shape.subtype
  
      if (!noattachlistener) {
        instance.addShape(newshape,true)
      }
      
      
	  }

}

var lastmove = 0

var attr = "cx,cy,fill,fill-opacity,font,font-family,font-size,font-weight,gradient,height,opacity,path,r,rotation,rx,ry,src,stroke,stroke-dasharray,stroke-opacity,stroke-width,width,x,y,text".split(",")


dumpshape = function(shape){
    //return Ax.canvas.info(shape)
    var info = {
      type: shape.type,
      id: shape.id,
      subtype: shape.subtype
    }
    
    for(var i = 0; i < attr.length; i++){
      var tmp = shape.attr(attr[i]);
      if(tmp){
        if(attr[i] == "path"){
          tmp = tmp.toString()
        }
        info[attr[i]] = tmp
      }
    }
    
    
    return info
}
  
  function init(){
    $(document).ready(function(){
    window.editor = new VectorEditor(document.getElementById("canvas"), $(window).width(),$(window).height());
    //editor.draw.rect(100,100,480,272).attr("stroke-width", 0).attr("fill", "white")
      setMode("select");
    if(wave && wave.isInWaveContainer()){
      //if(wave.getState()){
      
      //console.log(wave.getState())
        wave.setStateCallback(stateChanged)
      //}else{
      //  return alert("Failed! Wave State is MISSING! Not my fault!")
      //}
    }else{
      return humanMsg.displayMsg("It's only a wave gadget if it's in wave...")
    }

    $(window).resize(function(){
      editor.draw.setSize($(window).width(),$(window).height())
    })
    //setInterval(function(){
    editor.on("mousemove",function(){
    if(!isPlayback()){
              if((new Date).getTime()-lastmove > 500){
            for(var i =0;i<editor.selected.length;i++){
               shape = editor.selected[i]
                //console.log("add shape (interval):",shape) 
                //wave_set("data:"+shape.id,JSON.stringify(dumpshape(shape)))
                set_shape(shape.id, dumpshape(shape));
        
                lock_shape(shape.id)
            }
            lastmove = (new Date).getTime()
          }
        }else{
        playback_fail()
        }
  })
    //},1000)
    
    editor.on("addedshape", function(event, shape, no_select){
      if(!no_select  && !isPlayback()){
        //console.log("Initial Add Shape: ",shape.id)
        //wave_set("data:"+shape.id, JSON.stringify(dumpshape(shape)));
        set_shape(shape.id, dumpshape(shape));
        
        lock_shape(shape.id);
    }else{
      playback_fail()
    }
    })
    
    var lastlock = ""
    function showlock(locker){
      if(locker != lastlock){
        humanMsg.displayMsg("Shape(s) Locked by "+locker)
        lastlock = locker;
       }
    }

    editor.on("select", function(event,shape){
      if(shape){
      var locker;
      if(locker = is_locked(shape.id)){
        //oh noes! it's locked
        showlock(locker)
        return false
      }
      playback_fail()
      if(isPlayback())return false;
      
      //if nobody's locked it
      lock_shape(shape.id)
    }
    })
    
    editor.on("delete", function(event,shape){
      if(shape && !isPlayback()){
      var locker;
      if(locker = is_locked(shape.id)){
        //oh noes! it's locked
        showlock(locker)
        return false
      }
      //if nobody's locked it
      //lock_shape(shape.id)
      
      wave_set("data:"+shape.id, 'DEL/'+(new Date()).getTime());
        
      
    }
        playback_fail()
        
    })
    
    editor.on("selectadd", function(event,shape){
      if(shape && !isPlayback()){
      var locker;
      if(locker = is_locked(shape.id)){
        //oh noes! it's locked
        showlock(locker)
        return false
      }
      //if nobody's locked it
      lock_shape(shape.id)
    }
    })
    

    
    editor.on("unselect", function(event, shape){
      if(shape && !isPlayback()){
        unlock_shape(shape.id);
        //        if(!is_locked(shape.id)){
        //console.log("add shape (unselect):",shape.id)
        //wave_set("data:"+shape.id,JSON.stringify(dumpshape(shape)))
        set_shape(shape.id, dumpshape(shape));
        
        //sendUpdates();
      //}
      }
      
      playback_fail()
    })
    })
  }
  
  
  
  function set_shape(id,shape){
    wave_set("data:"+id, 
      Ax.small_json(
        Ax.compress_attr(shape)
      ));
  }
  
  gadgets.util.registerOnLoadHandler(init);
  
  
  
//////////////////////////////COMPRESSED WAVE STATE/////////////////////////////
///////////////////////////////STOLEN FROM AJAX ANIMATOR/////////////////////////  
var Ax = {};


Ax.small_json = function(obj){
  //simple JSON stringifier which creates small files
  //later if its still needed
  //mostly hackish as of now
  var nobj = {};
  for(var x in obj){
    //do hackishhack if its a legal name
    if(x.indexOf("-") == -1 && x.indexOf("!") == -1 && x.indexOf("/") == -1 && 
    x.indexOf("^") == -1 && x.indexOf("*") == -1 && x.indexOf("\\") == -1 && 
    x.indexOf(":") == -1 && x.indexOf("#") == -1 && x.indexOf("'") == -1 && 
    x.indexOf('"') == -1 && "0123456789".indexOf(x[0]) == -1){
      nobj["___"+x+"___"] = obj[x]
    }
  }
  var out = JSON.stringify(nobj);//Ext.util.JSON.encode(nobj);
  out = out.replace(/___"/g, "");
  out = out.replace(/"___/g, "");
  return out;
}


Ax.inverse_map = function(map){
  var nmap = {};
  for(var key in map){
    nmap[map[key]] = key;
  }
  return nmap;
}

Ax.compress_map = {
      "height": "h",
      "width": "w",
      "fill-opacity": "fo",
      "stroke-opacity": "so",
      "fill": "f",
      "stroke": "s",
      "rotation": "rt",
      "type": "t",
      "stroke-width": "sw",
      "subtype": "st",
      "path": "p",
      "font-size": "fs",
      "text": "tx"
    }
    


Ax.type_map = {
  "ellipse": "e",
  "rect": "r",
  "image": "i",
  "text": "t",
  //RECYCLED FOR SUBTYPES TOO. SORTA HACKISH
  "line": "l",
  "path": "p", //brilliant multi-use
  "polygon": "py"
}


Ax.compress_attr = function(attr){
  //shrink the old IDs to soemthign smaller and more manageable
  if(attr.id && attr.id.indexOf("shape:") === 0){
    if("0123456789".indexOf(attr.id[0]) == -1){
      attr.id = attr.id.substr(6, 4);
    }else{
      attr.id = 's'+attr.id.substr(6, 3);
    }
  }
  
  
  var map = Ax.compress_map
  var type_map = Ax.type_map;
  
  var nosend = ["fillColor","lineColor","lineWidth"]
  
  
  //var rmdef = {
  /* //tweening doesn't take into account defaults. damnit.
    "fill-opacity": 1,
    "stroke-opacity": 1,
    "rotation": 0,
    "stroke-width": 1
  */
  //}
  var newattr = {};
  for(var i in attr){
    if(nosend.indexOf(i) == -1){
      if(map[i]){
        //if(rmdef[i] !== attr[i]){
          if((i == "type" || i == "subtype") && type_map[attr[i]]){
            newattr[map[i]] = type_map[attr[i]]
          }else if(i == "path"){
            newattr[map[i]] = attr[i].toString()
          }else{
            newattr[map[i]] = attr[i]
          }
        //}
      }else{
        newattr[i] = attr[i]
      }
    }
  }
  return newattr;
}

Ax.decompress_attr = function(attr){
  var map = Ax.compress_map
  var type_map = Ax.inverse_map(Ax.type_map)
  //var newattr = {};
  for(var i in map){
    if(attr[map[i]] !== null && attr[map[i]] !== undefined ){
      var val = attr[map[i]];
      if(i == "type" || i == "subtype"){
        if(type_map[val]){
          val = type_map[val];
        }
      }
      attr[i] = val;
      delete attr[map[i]];
    }
  }
  return attr;
}
  
