import React from 'react';
import { map } from 'lodash';
import { omitObjIdKey } from './utils';

export const EditState = ({ values, error, editValues, handleSubmit, handleSave }) => {
  return (
    <div className="card">
      <div className="card-content">
        {map(omitObjIdKey(values), (value, key) => (
          <div key={key}>
            <label className="is-uppercase has-text-grey-light is-size-7">{key}</label>
            <input
              key={key}
              className="input has-text-weight-semibold has-text-grey-darker is-size-5 has-background-grey-lighter"
              name={key}
              type="text"
              onChange={e => handleSubmit(e)}
              value={editValues[key] || value}
            />
          </div>
        ))}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="card-footer">
        <span
          className="card-footer-item is-button"
          onClick={() => handleSave(editValues)}
        >
          Save
        </span>
      </div>
    </div>
  );
};

export default EditState;
