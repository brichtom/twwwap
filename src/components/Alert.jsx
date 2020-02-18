import React from 'react';

export default function alert(props) {
  return (
    <div className={`alert alert-${props.type}`}>
      <p className="lead">{props.message}</p>
    </div>
  );
}
