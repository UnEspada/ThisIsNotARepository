
const ViewCount = (props) => {
    
    return (
        <div className="counter">Contador: {props.count} | <button onClick={props.reset}>reset</button></div>
    );
}
export default ViewCount;
