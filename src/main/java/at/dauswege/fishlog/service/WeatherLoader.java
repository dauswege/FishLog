package at.dauswege.fishlog.service;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import at.dauswege.fishlog.weather.dto.WeatherData;

@Service
public class WeatherLoader {

  private final static String OPEN_WEATHER_MAP_URL =
      "http://api.openweathermap.org/data/2.5/weather?q=";

  private final static String OPEN_WEATHER_MAP_ID = "d67907173435821e967bf5ae8006b946";

  private final static String APPID = "APPID=";

  public void loadWeather() {

    RestTemplate restTemplate = new RestTemplate();

    StringBuilder sb = new StringBuilder();
    sb.append(OPEN_WEATHER_MAP_URL).append("Hallein,at");
    sb.append("&").append(APPID).append(OPEN_WEATHER_MAP_ID);

    WeatherData weatherData = restTemplate.getForObject(sb.toString(), WeatherData.class);

    System.err.println(ToStringBuilder.reflectionToString(weatherData));

  }

  public static void main(String args[]) {

    WeatherLoader weatherLoader = new WeatherLoader();

    weatherLoader.loadWeather();
  }

}
