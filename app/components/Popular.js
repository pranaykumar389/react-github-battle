import React, { Component } from 'react'

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


export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : 'All'
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(language) {
        this.setState(() => {
            return {
                activeTab: language
            }
        });
    }

    render() {
      
      return (
        <SelectedLanguage activeTab={this.state.activeTab}
            onSelect={this.updateLanguage} />
      );
    }
}
