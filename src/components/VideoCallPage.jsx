import { useEffect } from 'react';

const VideoCallPage = () => {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "yourRoomName",
      width: "100%",
      height: "100%",
      parentNode: document.getElementById('jitsi-container'),
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
  }, []);

  return <div id="jitsi-container" style={{ height: '600px' }}></div>;
};

export default VideoCallPage;
