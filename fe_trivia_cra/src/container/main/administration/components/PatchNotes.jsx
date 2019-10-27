import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/patch-notes.css';

const PatchNotes = () => {
    return (
        <span>
            <div className="center">
                {/* <!-- Patch Divider --> */}
                <div className="patch">
          Version 0.1.0:
                    <ul className="patch-notes">
                        <li>Login and sign up implemented</li>
                        <li>Authentication/authorization with page blocks in place</li>
                        <li>&#8810; Stroop Test - Easy &#8811; is online!</li>
                        <li>
              Leaderboards for all implemented quizzes are active and will rank
              the top ten users scores
                        </li>
                        <li>Added Log Out button</li>
                        <li>&#8810; Stroop Test - Complex &#8811; is online!</li>
                    </ul>
                </div>
            </div>
            <div className="center">
                <Link to="/"><button>Home</button></Link>
            </div>
        </span>
    );
};

export default PatchNotes;
