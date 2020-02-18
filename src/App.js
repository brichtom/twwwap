import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import List from './components/List';
import Alert from './components/Alert';
import AddForm from './containers/AddForm';

import { getEpisodes, saveEpisode, removeEpisode } from './services/storage';

class App extends Component {
  state = {
    alert: null,
    toExport: [],
  };

  addEpisode(title, series, episode, comment) {
    const data = getEpisodes();
    data.sort(this.sortById);

    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    episode = {
      id: newId,
      title: title,
      series: series,
      episode: episode,
      comment: comment,
    };

    saveEpisode(episode);
    this.showAlert('Episoda přidána!', 'success');
  }

  removeEpisode(id) {
    removeEpisode(id);
    this.showAlert('Episoda odebrána!', 'success');
  }

  sortById(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  showAlert(message, type) {
    const alert = <Alert type={type} message={message} />;
    this.setState({ alert: alert });

    setTimeout(() => this.setState({ alert: null }), 3 * 1_000);
  }

  addToExport(id) {
    const checked = [...this.state.toExport];
    checked.push(id);
    this.setState({ toExport: checked });
  }

  removeFromExport(idToRemove) {
    const checked = [...this.state.toExport];
    checked.forEach((id, index) => {
      if (idToRemove === id) {
        checked.splice(index, 1);
      }
    });
    this.setState({ toExport: checked });
  }

  export() {
    const exportedData = [];
    const idsToExport = [...this.state.toExport].sort();
    const serials = getEpisodes();

    idsToExport.forEach(idToExp => {
      serials.forEach(episode => {
        if (episode.id === idToExp) {
          exportedData.push(episode);
        }
      });
    });

    const data = new Blob([JSON.stringify(exportedData)], {
      type: 'text/plain',
    });
    const downloadUrl = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `serialy.json`);

    document.body.appendChild(link);

    link.click();

    link.parentNode.removeChild(link);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container mt-2">
          {this.state.alert} {/* will show only if not null*/}
          <AddForm
            add={(title, series, episode, comment) =>
              this.addEpisode(title, series, episode, comment)
            }
          />
          <List
            series={getEpisodes()}
            remove={id => this.removeEpisode(id)}
            addToExport={id => this.addToExport(id)}
            removeFromExport={id => this.removeFromExport(id)}
          />
          {this.state.toExport.length !== 0 && (
            <button
              type="submit"
              className="btn btn-success btn-block mb-3"
              onClick={() => this.export()}
            >
              Exportovat
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
