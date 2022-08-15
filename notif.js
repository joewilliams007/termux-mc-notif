// This is for personal usage :)

// Imports
const { exec } = require("child_process");
const getJSON = require('get-json')
var last_notif = "connected"

// Code
setInterval(function(){ 
  //this code runs every second 
  getJSON('http://192.168.2.107:2311/mc_message_for_termux/me')
  .then(function(response) {

    if (response.message == last_notif) {

    } else {
      last_notif = response.message
      console.log(response.message);
      create_notification(response.message)
    }

  }).catch(function(error) {
      getJSON('http://stardash.hopto.org:2311/mc_message_for_termux/me')
      .then(function(response) {

        if (response.message == last_notif) {

        } else {
          console.log(response.message);
          create_notification(response.message)
        }

      }).catch(function(error) {
        console.log(error);
      });
  });
  
}, 1000);


function create_notification (notif) {

    if (notification_id != "empty") {
        delete_notification()
    }

    exec(`termux-notification 
    --ongoing 
    --priority max 
    -i/--id messageofmc
    -t/--title Minecraft: ${notif}
    --type default`)
}

function delete_notification () {
    exec(`termux-notification-remove ${notification_id}`)
}
