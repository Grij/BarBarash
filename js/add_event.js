
			// date variables
			var now = new Date();
			today = now.toISOString();
			
			var twoHoursLater = new Date(now.getTime() + (2*1000*60*60));
			twoHoursLater = twoHoursLater.toISOString();
			
			// google api console clientID and apiKey (https://code.google.com/apis/console/#project:568391772772)
			var clientId = '337518657426-0eibgfepp196enosf36dm8j0ki52equp.apps.googleusercontent.com';
			var apiKey = '6a086d482aee043ce43c4ab91130d81518219d18';

			// enter the scope of current project (this API must be turned on in the google console)
			var scopes = 'https://www.googleapis.com/auth/calendar';


			// Oauth2 functions
			function handleClientLoad() {
				gapi.client.setApiKey(apiKey);
				window.setTimeout(checkAuth,1);
			}

			function checkAuth() {
				gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
			}

			// show/hide the 'authorize' button, depending on application state
			function handleAuthResult(authResult) {
				var authorizeButton = document.getElementById('authorize-button');
				var resultPanel		= document.getElementById('result-panel');
				var resultTitle		= document.getElementById('result-title');
				
				if (authResult && !authResult.error) {						
					authorizeButton.style.visibility = 'hidden';			// if authorized, hide button
					resultPanel.className = resultPanel.className.replace( /(?:^|\s)panel-danger(?!\S)/g , '' )	// remove red class
					resultPanel.className += ' panel-success';				// add green class
					resultTitle.innerHTML = 'Application Authorized'		// display 'authorized' text
					makeApiCall();											// call the api if authorization passed
				} else {													// otherwise, show button
					authorizeButton.style.visibility = 'visible';
					resultPanel.className += ' panel-danger';				// make panel red
					authorizeButton.onclick = handleAuthClick;				// setup function to handle button click
				}
			}
			
			// function triggered when user authorizes app
			function handleAuthClick(event) {
				gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
				return false;
			}
			
			// setup event details
			var resource = {
				"summary": "Sample Event " + Math.floor((Math.random() * 10) + 1),
				"start": {
					"dateTime": today
				},
				"end": {
					"dateTime": twoHoursLater
				}
			};
  
			// function load the calendar api and make the api call
			function makeApiCall() {
				gapi.client.load('calendar', 'v3', function() {					// load the calendar api (version 3)
					var request = gapi.client.calendar.events.insert({
						'calendarId':		'gk0pudanag1bhu35vkv5dunja4@group.calendar.google.com',	// calendar ID
						"resource":			resource							// pass event details with api call
					});
					
					// handle the response from our api call
					request.execute(function(resp) {
						if(resp.status=='confirmed') {
							document.getElementById('event-response').innerHTML = "Event created successfully. View it <a href='" + resp.htmlLink + "'>online here</a>.";
						} else {
							document.getElementById('event-response').innerHTML = "There was a problem. Reload page and try again.";
						}
						/* for (var i = 0; i < resp.items.length; i++) {		// loop through events and write them out to a list
							var li = document.createElement('li');
							var eventInfo = resp.items[i].summary + ' ' +resp.items[i].start.dateTime;
							li.appendChild(document.createTextNode(eventInfo));
							document.getElementById('events').appendChild(li);
						} */
						console.log(resp);
					});
				});
			}