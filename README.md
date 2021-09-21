
The latest version can be included in your player from this location: -

```
https://files-manywho-com.s3.amazonaws.com/e1dbcceb-070c-4ce6-95b0-ba282aaf4f48/iato.js
https://files-manywho-com.s3.amazonaws.com/e1dbcceb-070c-4ce6-95b0-ba282aaf4f48/iato.css

```

There's a simple demo here: -

https://flow.manywho.com/270413cf-3d82-420b-8432-11bc064f50b4/play/Innactivity/?flow-id=e2afa675-3a51-41eb-ae36-8ba7955b892b

# InactivityTimeout

![alt text](https://github.com/MarkWattsBoomi/InactivityTimeout/blob/main/warning.png)

![alt text](https://github.com/MarkWattsBoomi/InactivityTimeout/blob/main/logged.png)


## Functionality

Running at a player level this component will begin counting down from the last user click.

Once it reaches the timeout boundary it will display a configurable message for a configurable period then 
either redirect the user to a nominated uri if defined or show a 2nd popup declaring the session has expired.

Any user activity during the session or during the warning period will reset the timer.

Simply add the component files to your player's customResources tag.

Add the configuation object and configure it's settings.


## Player Settings

Add a global variable definition like this to your player in a script block

```
 var iato = {
            timeoutSeconds: 5,
            warningSeconds: 5,
            warningTitle: "Inactivity Warning",
            warningMessage: "You will be logged out in {{#}} seconds",
            warningFooter: "Click anywhere to cancel",
            loggedOutTitle: "Session Expired",
            loggedOutMessage: "Please close this window",
            redirectURI: "https://www.google.com"
        };
```

e.g.

```
     var iato = {
            timeoutSeconds: 5,
            warningSeconds: 5,
            warningTitle: "Inactivity Warning",
            warningMessage: "You will be logged out in {{#}} seconds",
            warningFooter: "Click anywhere to cancel",
            loggedOutTitle: "Session Expired",
            loggedOutMessage: "Please close this window",
            redirectURI: "https://www.google.com"
        };
        
        var manywho = {
            cdnUrl: 'https://assets.manywho.com',
            requires: ['core', 'bootstrap3'],
            customResources: [
                'https://f96b-81-130-194-25.ngrok.io/iato.js',
                'https://f96b-81-130-194-25.ngrok.io/iato.css'
            ],
```

### timeoutSeconds
Number.

Optional, default is 5.

The number of user inactivity seconds before the warning message is shown.

### warningSeconds
Number.

Optional, default is 60.

The number of user seconds to display the warning popup before redirecting the user to redirecURI.

### warningTitle
String.

Optional, default is "User Inactivity Detected".

The top line of text in the popup warning.

### warningMessage
String.

Optional, default is "You will be logged out in {{#}} seconds".

The second line of text in the popup warning.

"{{#}}" will be replaced with the number of warning seconds remaining.

### warningFooter
String.

Optional, default is "Click anywhere to cancel".

The bottom line of text in the popup warning.

### loggedOutTitle
String.

Optional, default is "Your Session Has Expired".

The top line of text in the popup after logout.

### loggedOutMessage
String.

Optional, default is "Please close this window".

The second line of text in the popup warning.



### redirectURI
String.

Optional, default is to not redirect.

The full uri to redirec the user's browser window to when the warning message expires.