export default function Die(prop){
    const styles={
        backgroundColor:prop.isheld?"#59E391":"white"
    }

    return (
        <button style={styles} onClick={prop.hold}>{prop.value}</button>
    )
}