import { useEffect, useState } from 'react';
import { DyteProvider, useDyteClient } from '@dytesdk/react-web-core';
import Meeting from './components/Meeting';
import { DyteDialogManager } from '@dytesdk/react-ui-kit';


// my user id 97b44bbf-ea3a-46ff-a2a6-2d1e58209eac
// sam's 8bb59fcc-b13a-481d-af87-a39b62de5109
// sam's mom 8bb59fc4-2831-44b4-9879-081246023766

function App() {
  const [meeting, initMeeting] = useDyteClient();
  const [authToken, setAuthToken] = useState(null)
  const [inputVal, setInputVal] = useState('')

  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;

  /*useEffect(() => {
    //startCall()
    
    const searchParams = new URL(window.location.href).searchParams;
        console.log('here', new URL(window.location.href))

        //const authToken = searchParams.get('authToken');
        //setAuthToken(searchParams?.get('authToken'))

    
  }, []);*/
console.log(authToken)
console.log('meeeting', meeting)
  //useEffect(() => {
    /*if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the URL query to join a meeting."
      );
      return;
    }*/

    /*initMeeting({
      authToken,
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, [authToken])*/


  const initDyteMeeting = (authToken) => {
    initMeeting({
      authToken,
      defaults: {
        audio: false,
        video: false,
      },
    });
  }

  const startCall = async () => {
    const url = 'https://api.dyte.io/v2/meetings';
    // Construct the Authorization header
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    // Data to be sent in the POST request
    const data = {
      // Add your request body here if needed
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth // Add the Authorization header
        },
        body: JSON.stringify(data) // Convert data to JSON string
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log(responseData);
        //addPreset()
        addParticipant(responseData.data.id)
      } else {
        // Request failed
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const addPreset = async () => {
    const url = 'https://api.dyte.io/v2/presets';
    // Construct the Authorization header
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    // Data to be sent in the POST request
    const data = {
      "name": "string",
      "config": {
        "view_type": "GROUP_CALL",
        "max_video_streams": {
          "mobile": 0,
          "desktop": 0
        },
        "max_screenshare_count": 0,
        "media": {
          "video": {
            "quality": "hd",
            "frame_rate": 30
          },
          "screenshare": {
            "quality": "hd",
            "frame_rate": 0
          }
        }
      },
      "permissions": {
        "accept_waiting_requests": true,
        "can_accept_production_requests": true,
        "can_edit_display_name": true,
        "can_spotlight": true,
        "is_recorder": false,
        "recorder_type": "NONE",
        "disable_participant_audio": true,
        "disable_participant_screensharing": true,
        "disable_participant_video": true,
        "kick_participant": true,
        "pin_participant": true,
        "can_record": true,
        "can_livestream": true,
        "waiting_room_type": "SKIP",
        "plugins": {
          "can_close": true,
          "can_start": true,
          "can_edit_config": true,
          //"config": "4de5a1b6-f730-4513-9ebe-16895971a32d"
          "config": {
            //"access_control": "VIEW_ONLY",
            "handles_view_only": true
          }
        },
        "connected_meetings": {
          "can_alter_connected_meetings": true,
          "can_switch_connected_meetings": true,
          "can_switch_to_parent_meeting": true
        },
        "polls": {
          "can_create": true,
          "can_vote": true,
          "can_view": true
        },
        "media": {
          "video": {
            "can_produce": "ALLOWED"
          },
          "audio": {
            "can_produce": "ALLOWED"
          },
          "screenshare": {
            "can_produce": "ALLOWED"
          }
        },
        "chat": {
          "public": {
            "can_send": true,
            "text": true,
            "files": true
          },
          "private": {
            "can_send": true,
            "can_receive": true,
            "text": true,
            "files": true
          }
        },
        "hidden_participant": true,
        "show_participant_list": true,
        "can_change_participant_permissions": true
      },
      "ui": {
        "design_tokens": {
          "border_radius": "rounded",
          "border_width": "thin",
          "spacing_base": 4,
          "theme": "dark",
          "colors": {
            "brand": {
              "300": "#844d1c",
              "400": "#9d5b22",
              "500": "#b56927",
              "600": "#d37c30",
              "700": "#d9904f"
            },
            "background": {
              "600": "#222222",
              "700": "#1f1f1f",
              "800": "#1b1b1b",
              "900": "#181818",
              "1000": "#141414"
            },
            "danger": "#FF2D2D",
            "text": "#EEEEEE",
            "text_on_brand": "#EEEEEE",
            "success": "#62A504",
            "video_bg": "#191919",
            "warning": "#FFCD07"
          },
          "logo": "string"
        },
        "config_diff": {}
      }
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth // Add the Authorization header
        },
        body: JSON.stringify(data) // Convert data to JSON string
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log(responseData);
        addParticipant(responseData.data.id)
      } else {
        // Request failed
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const addParticipant = async (id) => {
    const url = `https://api.dyte.io/v2/meetings/${id}/participants`;
    // Construct the Authorization header
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    // Data to be sent in the POST request
    let data = {}

    //if(navigator.userAgent.includes('Edg')) {
      if(navigator.userAgent.includes('Firefox')) {
      data = {
        "name": "User 1",
        "picture": "https://i.imgur.com/test.jpg",
        "preset_name": "8bb59fc4-2831-44b4-9879-081246023766",
        "custom_participant_id": "123456789"
      }
    } else {
      data = {
        "name": "User 2",
        "picture": "https://i.imgur.com/test.jpg",
        "preset_name": "group_call_participant",
        "custom_participant_id": "987654321"
      }
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth // Add the Authorization header
        },
        body: JSON.stringify(data) // Convert data to JSON string
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        console.log(responseData);
        initDyteMeeting(responseData.data.token)
        //setAuthToken(responseData.data.token)
      } else {
        // Request failed
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }
  console.log(navigator.userAgent)
//console.log(navigator.userAgent.includes('Edg'))
  // By default this component will cover the entire viewport.
  // To avoid that and to make it fill a parent container, pass the prop:
  // `mode="fill"` to the component.
  return (
    <><button
        onClick={() => startCall()}
      >Start Call</button>
      <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      <button onClick={() => addParticipant(inputVal)} >Add Participant</button>
    <DyteProvider value={meeting} fallback={<></>}>
      <DyteDialogManager meeting={meeting} />
      <Meeting />
    </DyteProvider>
    </>
  );
}

export default App;
