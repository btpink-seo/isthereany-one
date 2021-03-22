import React, { useState } from 'react';
import GreenRoom from '../components/GreenRoom/GreenRoom';
import VideoRoom from '../components/VideoRoom/VideoRoom';
import useSocket from '../lib/useSocket';
import { RoomState } from '../types';

type MatchParams = {
  roomId: string
};

const Room = ({ roomId }: MatchParams) => {
  const [roomState, setRoomState] = useState<RoomState>({
    isStarted: false,
    isMuted: false,
    isRecording: false,
    nickName: ''
  });

  return (
    <>
      {
        roomState.isStarted ?
          <VideoRoom roomId={roomId} /> :
          <GreenRoom
            roomId={roomId}
            roomState={roomState}
            setRoomState={setRoomState}
          />
      }
    </>
  );
};

export default Room;
