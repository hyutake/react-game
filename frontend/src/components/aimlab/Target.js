// import classes from './Target.module.css'

function Target(props) {
    return (
        <div onClick={props.onClick} className='absolute w-12 h-12 rounded-full bg-cyan-400' style={{left: props.position.x, top: props.position.y}}>
        </div>
    );
}

export default Target;