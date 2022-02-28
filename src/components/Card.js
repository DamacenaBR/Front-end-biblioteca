import React from 'react'

export default class Card extends React.Component {

    render() {

        return (

            <div className="card">
                <h3 className="card-header text-center">{this.props.titulo}</h3>
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}