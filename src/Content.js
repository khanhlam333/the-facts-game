import './Content.css';

export default function Content (props) {
    return(
        <div className="content">
            <p>{props.info.fact}</p>
            <p id="source">Source: <a href={props.info.source} target="_blank" rel="noreferrer noopener">{props.info.sourceName}</a></p>
        </div>
    )
}