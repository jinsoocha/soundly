// stateless component
// testing to see if spread will pull in all the neded song data
const QueueEntryView = ({song}) => <div>{...song}</div>

window.QueueEntryView = QueueEntryView;