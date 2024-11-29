import React, { useEffect, useRef } from 'react';
import JitsiMeetExternalAPI from 'lib-jitsi-meet';

const VideoCallPage = ({ match }) => {
  const containerRef = useRef(null);
  const roomId = match.params.roomId; // Extract room ID from the route

  useEffect(() => {
    if (roomId) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: roomId,
        width: '100%',
        height: 600,
        parentNode: containerRef.current,
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        },
      };

      const api = new JitsiMeetExternalAPI(domain, options);

      api.addEventListener('videoConferenceJoined', () => {
        console.log('Joined the video conference room:', roomId);
      });

      return () => {
        api.dispose();
      };
    }
  }, [roomId]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Video Call</h1>
      <div ref={containerRef}></div>
    </div>
  );
};

export default VideoCallPage;
