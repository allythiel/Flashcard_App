import React from 'react';
import './app.css';

function Flashcards(props){
    return (
        <div className="flashcards">
            <div className="card">
                <h1 className="term">{props.flashcards.term}</h1>
                <h4 className="description">{props.flashcards.description}</h4>
            </div>
        </div>
    );
}

export default Flashcards;