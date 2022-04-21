interface AppConfigMap {
  /**
   * HttpRequestBaseURL
   */
  apiBaseUrl: string;
  /**
   * WebsocketBaseURL
   */
  wsBaseUrl: string;
  /**
   * 当前user的JWT
   */
  token: string;
}

export class AppConfig {
  static configMap = {} as AppConfigMap;

  static set = <T extends keyof AppConfigMap>(
    key: T,
    value: AppConfigMap[T],
  ) => {
    AppConfig.configMap[key] = value;
    if (key === 'token') {
      localStorage.setItem('token', value);
    }
  };

  static get = <T extends keyof AppConfigMap>(key: T) => AppConfig.configMap[key];

  static setMap = (newConfig: AppConfigMap) => {
    AppConfig.configMap = newConfig;
  };
}
