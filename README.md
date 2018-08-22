# RoadMapJS Docs

## Table of Contents

* [About](#about)
* [Getting Started](#Getting-Started)



## About

RoadMapJS was an attempt at making a simple plan of what needs to be done within a project, and sorting out the tasks into rows based on what is needed to complete them.

A simple yet contrived example for this would be taking the top card from a deck of playing cards. In order to complete this task, the first thing to do would be to get a deck of cards, then open the box, then take cards out of the box and place on the table and finally pickup the top card. In this example you can't do the next action without having done the first action.

## Getting Started

### How To Include

	I am currently looking at setting up a CDN for this, however I am not sure when it will go live.

To use the default element styling in your web page, use the following link code to include the stylesheet from your assets directory, after downloading either the minified or non minified version.

    Minified:
    <link rel="stylesheet" src="pathToCSSAssets/roadmap.min.css" type="text/stylesheet">

	Non Minified:
	<link rel="stylesheet" src="pathToCSSAssets/roadmap.css" type="text/stylesheet">


To add the actually functionality to your webpage, use the following script tag, again after downloading either the minified or non minified version.

    Minified:
    <script type="text/javascript" src="pathToJSAssets/roadmap.min.js></script>
    Non Minified:
    <script type="text/javascript" src="pathToJSAssets/roadmap.js></script>

Once included, create an element in your page, and make sure it has the id="roadmap" and data-roadmap="YOURROADMAP.json" attributes. An example is shown below:

	<div id="roadmap" data-roadmap="roadmap.json"></div>

Finally, you need to provide the roadmap.json file, which is explained in the next section.

### Your roadmap.json

roadmap.json is a file on your directory, which defines all of the tasks for a given project. The format for a task is the following object:

	For an initial task, one that does not need any prior tasks:
	{
		"name":"Task A",
		"description":"Description of task A",
		"status":"In Progress",
		"dependencies":[null]
	}

	For a task that depends on another task to be completed first:
	{
		"name":"Task B",
		"description":"Description of task B",
		"status":"Not Started",
		"dependencies":["Task A"]
	}

**N.B. All tasks need to be wrapped in an array, e.g. [ {TaskOneObject},{TaskTwoObject},{TaskThreeObject}]**
A working example will be live in the next few days (between 22/08/2018 and 31/08/2018).

#### The status value

As a side note, the value for status can be whatever you would like it to be, "Not Started" and "In Progress" are just examples.

### Initialising the roadmap

So you have imported the necessary files, added your roadmap container and made your roadmap file, and you test in browser (I would recommend Firefox for testing locally) and nothing appears. There are 2 possible reasons for this.

1. Your browser is blocking CORS requests.
2. You haven't enabled the function to generate the roadmap.

I can't really do much about problem one, only that if you are using a file://<path-to-webpage> then to use the Firefox browser, or to push your webpage to a webserver and access via localhost/remote web address.

Problem 2 on the other hand, is completely intentional as I don't know what event you want the roadmap to load on. Example ways to load the roadmap include:
 * window.onLoad=genRoadMap,
 * document.addEventListener("DOMContentLoaded", genRoadMap);
 * document.getElementById("myAmazingButton").addEventListener("click", genRoadMap);

By including this in a script loaded after roadmapJS, the roadmap will be generated when the event is called.

### Custom styling

By default the provided css file give style rules for the roadmap task container, the status tag used for the task.status string and a class to add a glow effect to a tasks dependencies. Below is a list of all css classes and ids used within the generated code:

 + status   : A custom tag for defining the status of a task. This may be changed to a span+id as some point in the future.
 + #roadmap : The overall container for the roadmap that will be created
 + .roadRow : The container for each row in the Road Map.
 + .roadNode: The container for each task node in the Road Map.
 + .glow    : A class that is programatically added to parent task nodes of the current task, as identified by the css class {dep}.
 + .dep     : A marker for each dependency of the task node, used to identify which task nodes the current task node depends on.

In addition styling rules can be applied to each task node via it's element id, which is the same as it's the title from the object.


# License

This code is licensed under the MIT License, so feel free to go wild with it :+1: :smile:
