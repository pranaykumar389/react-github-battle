import React, { Component } from 'react'

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
      const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
      return (
        <ul className="languages">
            {
                languages.map(language => {
                    return (
                        <li onClick={this.updateLanguage.bind(null, language)} 
                            key={language}
                            style={language === this.state.activeTab ? { color: '#d0021b' } : null}
                        >
                            {language} 
                        </li>
                    )}
                )
            }
        </ul>
      );
    }
}
