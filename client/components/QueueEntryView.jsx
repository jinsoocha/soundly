// stateless component
// testing to see if spread will pull in all the neded song data
// {...song}
const QueueEntryView = ({song}) => <div>{song}</div>

window.QueueEntryView = QueueEntryView;