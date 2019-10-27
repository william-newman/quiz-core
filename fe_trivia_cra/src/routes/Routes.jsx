import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '../container/QuizCoreContainer';
import NotFound from '../container/error-pages/components/PageNotFound';
import Login from '../container/main/auth/components/Login';
import SignUp from '../container/main/auth/components/SignUp';
import QuizMenu from '../container/main/menu/components/QuizMenu';
import StroopEasy from '../container/main/quizzes/components/StroopEasy';
import NeatForm from '../container/main/auth/components/NeatForm';
import Leaderboard from '../container/main/leaderboards/components/Leaderboard';
import PatchNotes from '../container/main/administration/components/PatchNotes';
import FeedbackForm from '../container/main/administration/components/FeedbackForm';

// Switch to component based on URL, if none then display PageNotFound component
function Routes() {
    return (
        <div>
            <Route path="/" component={Container} />
            <div className="main">
                <Switch>
                    <Route exact path="/" component={QuizMenu}/>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/form" component={NeatForm} />
                    <Route path="/feedback" component={FeedbackForm} />
                    <Route path="/patch_notes" component={PatchNotes} />
                    <Route path="/leaderboards" component={Leaderboard} />
                    <Route path="/stroop-easy" component={StroopEasy} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </div>
    );
}

export default Routes;