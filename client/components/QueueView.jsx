// stateless functional component
const QueueView = ({song}) => {
  return (
    <div>
      <h3>Queue</h3>

    </div>
  );
}

window.QueueView = QueueView;


        // <ul>
        // {song.map((title, artist) => {
        //   return (
        //     <li>
        //       <QueueEntryView
        //         key={song.id}
        //         track={song.track}
        //         artist={song.artist}/>
        //     </li>
        //   )
        // })}
        // </ul>