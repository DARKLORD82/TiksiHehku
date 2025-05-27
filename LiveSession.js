import LiveSession from './LiveSession';

export default function LiveViewerScreen() {
  const token = 'YOUR_GENERATED_VIEWER_TOKEN';
  const url = 'wss://tiksihehku-ivm01d0v.livekit.cloud';

  return (
    <RoomProvider>
      <LiveSession token={token} url={url} />
    </RoomProvider>
  );
}