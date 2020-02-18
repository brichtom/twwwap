import React, { Component } from 'react';

export default class AddForm extends Component {
  emptyState = {
    title: {
      content: '',
      valid: false,
    },
    series: {
      content: '',
      valid: false,
    },
    episode: {
      content: '',
      valid: false,
    },
    comment: {
      content: '',
      valid: false,
    },
  };
  state = {
    ...this.emptyState,
  };

  inputChangeHandler(event, field) {
    const updtedValue = event.target.value;
    const valid = updtedValue !== '';
    switch (field) {
      case 'title':
        this.setState({ title: { content: updtedValue, valid: valid } });
        break;
      case 'series':
        this.setState({ series: { content: updtedValue, valid: valid } });
        break;
      case 'episode':
        this.setState({ episode: { content: updtedValue, valid: valid } });
        break;
      case 'comment':
        this.setState({ comment: { content: updtedValue, valid: valid } });
        break;
      default:
        break;
    }
  }

  isValid() {
    let valid = true;
    for (let input in this.state) {
      valid = valid && this.state[input].valid;
    }
    return valid;
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.add(
      this.state.title.content,
      this.state.series.content,
      this.state.episode.content,
      this.state.comment.content
    );
    this.setState({ ...this.emptyState });
  }

  render() {
    return (
      <form id="serial-form" onSubmit={event => this.onSubmit(event)}>
        <div className="form-group">
          <label htmlFor="title">Seriál</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={this.state.title.content}
            onChange={event => this.inputChangeHandler(event, 'title')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="series">Série</label>
          <input
            type="text"
            id="series"
            className="form-control"
            value={this.state.series.content}
            onChange={event => this.inputChangeHandler(event, 'series')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="episode">Díl</label>
          <input
            type="text"
            id="episode"
            className="form-control"
            value={this.state.episode.content}
            onChange={event => this.inputChangeHandler(event, 'episode')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Komentář</label>
          <input
            type="text"
            id="comment"
            className="form-control"
            value={this.state.comment.content}
            onChange={event => this.inputChangeHandler(event, 'comment')}
          />
        </div>
        <input
          type="submit"
          value="Přidat"
          disabled={!this.isValid()}
          className="btn btn-primary btn-block"
        />
      </form>
    );
  }
}
