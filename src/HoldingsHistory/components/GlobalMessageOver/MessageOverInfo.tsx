interface MessageOverInfoProps {
  label: string;
}

const MessageOverInfo = ({ label }: MessageOverInfoProps) => {
  return (
    <div style={{ whiteSpace: 'nowrap', margin: '2px 8px 10px 8px', minWidth: '140px', textAlign: 'center' }}>
    <strong>Informations about {label}</strong>
    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', fontWeight: 'normal', fontSize: '14px' }}>
      <div style={{ marginRight: '8px', textAlign: 'left' }}>
        Here we can have all the info
      </div>
      <div style={{ marginRight: '8px', textAlign: 'left' }}>
        about {label}.
      </div>
    </div>
  </div>
  );
};

export default MessageOverInfo;
