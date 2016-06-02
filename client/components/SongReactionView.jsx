// stateless functional component
const SongReactionView = ({ count }) => {
  // this will be inside the SongQueueEntryView
  return (
    <div>
      // create reference to upview and downview
      // this will not work... but I want to get the thought out there
      <UpView up={count} />
      <DownView down={count} />
    </div>
  );

};

window.SongReactionView = SongReactionView;
