export default function Die(prop){
    const styles={
        backgroundColor:prop.isheld?"#59E391":"white"
    }

    return (
        <button style={styles} onClick={prop.hold} aria-pressed={prop.isheld} aria-label={`Die with a value ${prop.value},${prop.isheld?"held":"unheld"}`}>{prop.value}</button>
    )
}