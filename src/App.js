import React, { Component } from 'react';
import './App.css';
import SmartFormCard from './SmartFormCard';
import { omitObjIdKey } from './SmartFormCard/utils';
import { getAll, updateById } from './API';
// import Spinner from './Spinner';
import Loader from './Loader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  async componentDidMount () {
    const data = await getAll();
    this.setState({ data });
  }

  update = async (input, callback) => {
    const data = await updateById(input.id, omitObjIdKey(input));
    callback(data);
  };

  render() {
    return (
      <div className="container">
        <h1 className="is-size-3 m-t-30 has-text-weight-bold has-text-black-ter">Star wars characters</h1>
        {this.state.data.length === 0 ? <Loader /> : null}
        <div className="columns container m-t-30 p-b-50">
        {
          this.state.data.length === 0 ? null :
          this.state.data.map(user => (
            <div key={user.id} className="column is-one-quarter">
              <SmartFormCard
                handleUpdate={(input, callback) => this.update(input, callback)}
                initialData={user}
                loadingIndicator={Loader}
              />
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}

export default App;
