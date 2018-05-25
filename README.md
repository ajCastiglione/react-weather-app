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
<li><del>Implemented today component and building selected day component currently</del></li>
<li><del>Add routing to adjust layout based on the day that is selected</del></li>
<li><del>Change how the current day works, make it so it changes based on what is selected instead of being hard coded to call today only or make a new component that shows when a day is clicked..<del></li>
<li><del>Will most likely run with a new component. This component will check if the current day is equal to the selected day and do nothing if its selected or re-render the today component.<del></li>
<li><del>Implement reverse geo-coding using their lat lng to get info about their location, namely for the city. (will use google's reverse geocoding)</del></li>
<li><del>Dynamic routing is setup, have a catch to check if the day being clicked is the current day - if so link back to home - otherwise link to the selected day</del></li>
<li>Need to display the currently selected day's name, work on changing up the layout a bit to make it work for the information it comes with.</li>
<li><del>Implement scroll to top functionality when a day is selected (done this before, just dont remember if it was vanillaJS or jquery)</del></li>
<li>Using jquery for smooth scrolling and ajax requests since jsonp is needed due to cors issue</li>
<li>Added a button that allows the user to fetch current weather, also have an interval fetching updates every 5 minutes.</li>
</ol>
