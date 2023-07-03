// import classes from './Target.module.css'

function Target(props) {
    return (
        <div onClick={props.onClick} className={props.className} style={{left: props.position.x, top: props.position.y}}>
        </div>
    );
}

export default Target;