
export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div
            className="die"
            style={styles}
            onClick={props.holdDie}
        >
            <h3 className="die-num">{props.value}</h3>
        </div>
    )
}