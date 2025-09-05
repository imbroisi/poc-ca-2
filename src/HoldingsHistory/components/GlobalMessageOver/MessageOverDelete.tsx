interface MessageOverDeleteProps {
  linkData: any;
}

const MessageOverDelete = ({ linkData }: MessageOverDeleteProps) => {
  return (
    <div>
      Delete 
      <div>Holding: (TODO) </div>
      <div>Attribute: (TODO) </div>
      <div>{linkData.firstDayDate} - {linkData.lastDayDate}</div>
    </div>
  );
};

export default MessageOverDelete;