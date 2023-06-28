import classes from './Target.module.css'

function Target(props) {
    return (
        <div onClick={props.onClick} className={classes.target} style={{left: props.position.x, top: props.position.y}}>
        </div>
    );
}

export default Target;