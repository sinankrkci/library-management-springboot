import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../layouts/Utils/SpinnerLoading';
import OktaSignInWidget from './OktaSignInWidget';

const LoginWidget = ({ config }) => {
    const {oktaAuth, authState} = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    };

    if(!authState) {
        return (
            <SpinnerLoading /> // Loading spinner while authState is being determined
        );
    }

    return authState.isAuthenticated ? 
    <Redirect to = {{ pathname: '/' }} /> 
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />; // Render the Okta sign-in widget


}; // Placeholder for the login widget UI

    // You can replace the <div></div> with your actual login widget UI

    // Example of using Okta's sign-in widget (if you have it set up)
    // const widget = new OktaSignIn({
    //     baseUrl: config.issuer.split('/oauth2')[0],
    //     clientId: config.clientId,
    //     redirectUri: window.location.origin + '/login/callback',
    //     authParams: {
    //         issuer: config.issuer,
    //         responseType: 'id_token',
    //         display: 'page'
    //     }
    // });
    
    // widget.renderEl({ el: '#widget-container' }, onSuccess, onError);

export default LoginWidget;