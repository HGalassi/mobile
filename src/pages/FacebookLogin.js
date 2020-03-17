import React, { Component } from 'react';
import { View } from 'react-native';

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

export default class FacebookLogin extends Component {
  async facebookLogin() {
    // native_only config will fail in the case that the user has
    // not installed in his device the Facebook app. In this case we
    // need to go for webview.
    let result;
    try {
      this.setState({showLoadingModal: true});   
      LoginManager.setLoginBehavior('NATIVE_ONLY');
      result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    } catch (nativeError) {
      try {
        LoginManager.setLoginBehavior('WEB_ONLY');
        result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      } catch (webError) {
        // show error message to the user if none of the FB screens
        // did not open
      }
    }
    // handle the case that users clicks cancel button in Login view
    if (result.isCancelled) {
      this.setState({
        showLoadingModal: false,
        notificationMessage: I18n.t('welcome.FACEBOOK_CANCEL_LOGIN')
      });
    } else {
      // Create a graph request asking for user information
      this.FBGraphRequest('id, email, picture.type(large)', this.FBLoginCallback);
    }
  }
  render() {
    return (
      
      <View>
        <FBButtonWrapper>
            <Button
              text={I18n.t('welcome.LOGIN_WITH_FACEBOOK')}
              width={widthPercentageToDP('59%')}
              fontSize={heightPercentageToDP('2.85%')}
              onClick={this.facebookLogin}
              backgroundColor={colors.blue}
              textColor={colors.white}
              padding={`${heightPercentageToDP('2.7%')} ${heightPercentageToDP('3.2%')}`}
              borderRadius={widthPercentageToDP('10%')}
            />
        </FBButtonWrapper>
      </View>
    );
  }
};