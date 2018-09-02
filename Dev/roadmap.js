var root = document.getElementById("roadMap");
function genRoadMap(){
  if(!root){
    console.log("RoadMap Root Element Not Found");
  }
  else if(root.dataset.roadmap==""||root.dataset.roadmap==null||root.dataset.roadmap=="undefined"){
    console.log("roadmap file is not defined");
  }
  else {

    if(root.dataset.roadmap.indexOf(".json")>-1){
      getFile(root.dataset.roadmap, function(response) {
        root.innerHTML = createRoadMapHTML(nodeTree(JSON.parse(response)));
        initElems(document.querySelectorAll(".roadNode"));
      });
    }
    else{
      fetch(root.dataset.roadmap).then(response=>response.json()).then(function(jsonString){
        root.innerHTML = createRoadMapHTML(nodeTree(JSON.parse(jsonString)));
        initElems(document.querySelectorAll(".roadNode"));
      });
    }
  }
}

//asynchronously obtains a file as a json file.
function getFile(filename, callback){
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

/**
 * <summary>Creates the RoadMap Tree as a 2d array from a given json string.</summary>
 * <param>
 *   <name>json</name>
 *   <type>String</type>
 *   <description>A JSON string containing all node/entries in the roadmap to display</description>
 * </param>
 * <returns>A 2d array of the node objects</returns>
 */
function nodeTree(json){
  var nodeList=[];
  var rootNodes = [];
  var p = 0;
  for(var i in json){
    if(json[i].dependencies==null||(json[i].dependencies[0]==null&&json[i].dependencies.length==1)){
      rootNodes.push(json[i]);
      json.splice(i, 1);
    }
  }
  nodeList.push(rootNodes);
  while(json.length>0) {
    if(p==json.length) p = 0;
    var check = checkListForAllDeps(json[p].dependencies, nodeList);
    if(check[0]) {
      if(nodeList.length < check[1]) nodeList.push([]);
      nodeList[check[1]-1].push(json[p]);
      json.splice(p, 1);
    }
    else p++;
  }
  return nodeList;
}

/**
 * <summary>Finds the smallest row index for a node, given it's dependencies.</SUMMARY>
 * <param>
 *   <name>deps</name>
 *   <type>array</type>
 *   <description>The array of dependencies for the node</description>
 * </param>
 * <param>
 *   <name>nodes</name>
 *   <type>array</type>
 *   <description>The current nodes in the tree</description>
 * </param>
 * <returns>An array where index 0 is whether all dependencies are in the list, and index 1 is the row the node belongs in.</returns>
 */
function checkListForAllDeps(deps, nodes){
  var allInList = [];
  var max = 0;
  for(var i in deps) allInList.push(-1);
  for(var i in deps) {
    for(var j in nodes) {
      for(var k in nodes[j]) {
        if(deps[i]===nodes[j][k].title) {
          allInList[i]=1;
          if(j>max)max=j;
          break;
        }
      }
    }
  }
  return [allInList.every(moreThanZero), parseInt(max)+2];
}

function moreThanZero(currentValue){
  return currentValue>0;
}

/**
 * <summary>Create a html string for use in the document.</SUMMARY>
 * <param>
 *   <name>nodeObj</name>
 *   <type>object</type>
 *   <description>An object representing the node to display</description>
 * </param>
 * <returns>html for rendering the roadMap on the page</returns>
 */
function createNodeHTMLObject(nodeObj) {
  var result = "";
  result+="<div id='"+sanitize(nodeObj.title)+"' class='roadnode'><div style='display:table-cell'><h3>"+nodeObj.title+"</h3><p>"+nodeObj.description+"<br/>";
  for(var j in nodeObj.dependencies) {
    if(!(nodeObj.dependencies[j]=="null"||(nodeObj.dependencies[j]==null&&nodeObj.dependencies.length==1))){
      result+="Task depends on : <span class='dep'>"+nodeObj.dependencies[j]+"</span><br/>";
    }
  }
  result+="</p><br/><status>"+nodeObj.status+"</status></div></div>";
  return result;
}

function createRoadMapHTML(nodeList){
  var res = "";
  for(var i in nodeList){
    var currentRow = nodeList[i];
    res+="<div class='roadRow'>";
    for(var j in currentRow){
      res+=createNodeHTMLObject(currentRow[j]);
    }
    res+="</div>"
  }
  return res;
}

/**
 * Sanitizes strings for processing/html compliance
 */
function sanitize(str){
  return str.replace(" ", "");
}

function initElems(nodeElems){
  var maxHeight=0;
  for(var i in nodeElems){
  if(maxHeight<nodeElems[i].offsetHeight)
    maxHeight=nodeElems[i].offsetHeight;
  }
  nodeElems.forEach(function(elem){
    elem.style.height=maxHeight+"px";
    elem.addEventListener("mouseover", function(current){
      var deps = elem.querySelectorAll(".dep");
      deps.forEach(function(el){
        document.getElementById(sanitize(el.innerText)).classList.add("glow");
      });
    });
    elem.addEventListener("mouseout", function(current){
      var deps = elem.querySelectorAll(".dep");
      deps.forEach(function(el){
        document.getElementById(sanitize(el.innerText)).classList.remove("glow");
      });
    });
  });
}
