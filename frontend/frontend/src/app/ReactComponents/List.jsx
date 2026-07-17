
export default function List(props) {

    return (
        <div className="border-3 rounded-xl w-fit p-2 mt-2">
            <p className="text-3xl">{props.title} </p>
            <hr />
            <p>Done: {props.donePercentage || 0}%</p>
        </div>
    )
}