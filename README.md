# React Weather app

This web app displays the current weather in your area and a 5 day forecast. (or at least it will...)

## How to run the project
<ol>
<li>run the command npm install</li>
<li>then use the command npm start</li>
</ol>

Following those steps will give you the development build of the application. It can be compiled with npm run build.

## Status / TODO
<ol>
<li>Implement -Today / selected- component showing icon on left, temps on right, forcast desc. under the temps or under the icon (whatever looks better)</li>
<li>Add routing to adjust layout based on the day that is selected</li>
<li>Change how the current day works, make it so it changes based on what is selected instead of being hard coded to call today only or make a new component that shows when a day is clicked..</li>
<li>Will most likely run with a new component. This component will check if the current day is equal to the selected day and do nothing if its selected or re-render the today component.</li>
</ol>