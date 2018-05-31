import React, { Component } from 'react';
import api       from '../utils/api';
import PropTypes from 'prop-types';
import Loading  from './Loading';

const SelectedLanguage = props => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className="languages">
            {
                languages.map(language => {
                    return (
                        <li onClick={props.onSelect.bind(null, language)} 
                            key={language}
                            style={language === props.activeTab ? { color: '#d0021b' } : null}
                        >
                            {language} 
                        </li>
                    )}
                )
            }
        </ul>
    );
};

SelectedLanguage.propTypes = {
    activeTab : PropTypes.string.isRequired,
    onSelect  : PropTypes.func.isRequired
}

const RepoGrid = props => {
    return (
        <ul className="popular-list">
            {
                props.repos.map((repo, index) => {
                    return (
                        <li key={repo.name} className="popular-item">
                            <div className="popular-rank">#{index + 1}</div>
                            <ul className="space-list-items">
                                <li>
                                    <img className="avatar"
                                        src={repo.owner.avatar_url}
                                        alt={'Avatar for ' + repo.owner.login} 
                                    />
                                </li>
                                <li>
                                    <a href={repo.html_url}>{repo.name}</a>
                                </li>
                                <li>@{repo.owner.login}</li>
                                <li>{repo.stargazers_count} stars</li>
                            </ul>
                        </li>
                    );
                })
            }
        </ul>
    )
};

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab    : 'All',
            repos : null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.activeTab);
    }

    updateLanguage(language) {
        this.setState(() => {
            return {
                activeTab: language
            }
        });

        api.fetchPopularRepos(language)
            .then(repos => {
                this.setState(() => {
                    return {
                        repos : repos
                    }
                })
            })
            .catch(err => console.log('err: ', err));
    }

    render() {
      
      return (
        <div>
            <SelectedLanguage 
                activeTab={this.state.activeTab}
                onSelect={this.updateLanguage} />
            {!this.state.repos 
                ? <Loading />
                : <RepoGrid repos={this.state.repos} />}
        </div>
      );
    }
}
