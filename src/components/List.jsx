import React from 'react';

import Row from './Row';

export default function list(props) {
  return (
    <table className="table table-striped mt-5">
      <thead>
        <tr>
          <th>Seriál</th>
          <th>Série</th>
          <th>Díl</th>
          <th>Komentář</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.series.map(episode => (
          <Row
            key={episode.id}
            episode={episode}
            remove={id => props.remove(id)}
            addToExport={id => props.addToExport(id)}
            removeFromExport={id => props.removeFromExport(id)}
          />
        ))}
      </tbody>
    </table>
  );
}
