import React, { useEffect, useRef, useState } from 'react';
import JitsiMeetExternalAPI from 'lib-jitsi-meet';

const VideoCallPage = ({ match }) => {
  const containerRef = useRef(null);
  const roomId = match.params.roomId; 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      try {
        const api = new JitsiMeetExternalAPI(domain, options);

        api.addEventListener('videoConferenceJoined', () => {
          console.log('Joined the video conference room:', roomId);
          setLoading(false);  
        });

        api.addEventListener('videoConferenceLeft', () => {
          console.log('Left the video conference room:', roomId);
        });

        return () => {
          if (api) {
            api.dispose();
          }
        };
      } catch (err) {
        console.error('Error loading Jitsi API:', err);
        setLoading(false);
        setError('Failed to load the video call. Please try again later.');
      }
    } else {
      setLoading(false);
      setError('Room ID is missing.');
    }
  }, [roomId]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Video Call</h1>
      {loading && <p className="text-center">Loading the video call...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div ref={containerRef}></div>
    </div>
  );
};

export default VideoCallPage;
