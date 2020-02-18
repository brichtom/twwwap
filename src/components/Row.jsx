import React, { useState } from 'react';

export default (props) => {

    const [checked, setChecked] = useState(false);

    const handleChange = (id) => {
        const isChecked = !checked;
        if (isChecked) {
            props.addToExport(id);
        } else {
            props.removeFromExport(id);
        }
        setChecked(isChecked);
    }

    return (
        <tr key={props.episode.id}>
            <td>{props.episode.title}</td>
            <td>{props.episode.series}</td>
            <td>{props.episode.episode}</td>
            <td>{props.episode.comment}</td>
            <td><input
                name="export"
                type="checkbox"
                checked={checked}
                onChange={() => handleChange(props.episode.id)} /></td>
            <td>
                <button
                    className="btn btn-danger btn-sm delete"
                    onClick={() => props.remove(props.episode.id)}
                >
                    X
           </button>
            </td>
        </tr>
    )
}