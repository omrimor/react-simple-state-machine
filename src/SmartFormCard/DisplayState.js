import React from 'react';
import { map } from 'lodash';
import { omitObjIdKey } from './utils';

export const DisplayState = ({ values, handleEdit }) => {
  return (
    <div className="card">
      <div className="card-content">
        {map(omitObjIdKey(values), (value, key) => (
          <div key={key}>
            <label className="is-uppercase has-text-grey-light is-size-7">{key}</label>
            <div className="has-text-weight-semibold has-text-grey-darker is-size-5">{value}</div>
          </div>
        ))}
      </div>
      <div className="card-footer">
        <span
          className="card-footer-item is-button"
          onClick={() => handleEdit('edit', values)}
        >
          Edit
        </span>
      </div>
    </div>
  );
};

export default DisplayState;
