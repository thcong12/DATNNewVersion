export class GlobalVariable {
  constructor() {}
  public removeSession() {
    localStorage.clear();
  }

  //handle login stage
  setLoginStage(value: string) {
    localStorage.setItem('login_stage', value);
  }
  get getLoginStage() {
    return localStorage.getItem('login_stage');
  }

  //handle refresh token
  setRefreshToken(value: any) {
    localStorage.setItem('x-refresh-token', String(value));
  }
  get getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  //handle access token
  get getAccessToken() {
    return localStorage.getItem('x-access-token');
  }
  setAccessToken(value: any) {
    localStorage.setItem('x-access-token', String(value));
  }

  //handle  user profile
  setUserProfile(value: any) {
    localStorage.setItem('User_Profile', String(JSON.stringify(value)));
  }
  get getUserProfile() {
    return localStorage.getItem('User_Profile');
  }

  screenName: string = '';
}
