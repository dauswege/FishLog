package at.dauswege.fishlog.service;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.nio.charset.Charset;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import at.dauswege.fishlog.weather.dto.WeatherData;

@Service
public class WeatherLoader
{

    private final static String OPEN_WEATHER_MAP_URL =
        "http://api.openweathermap.org/data/2.5/weather";

    private final static String OPEN_WEATHER_MAP_ID = "d67907173435821e967bf5ae8006b946";

    private final static String APPID = "APPID";

    public WeatherData loadWeather() throws URISyntaxException, MalformedURLException
    {

        RestTemplate restTemplate = new RestTemplate();

        URIBuilder builder = new URIBuilder(OPEN_WEATHER_MAP_URL);
        builder.setCharset(Charset.forName("UTF-8"));
        // Attention!!!! set in quotes
        builder.addParameter("q", "\"Hallein,at\"");
        builder.addParameter("units", "metric");
        builder.addParameter("lang", "de");
        builder.addParameter(APPID, OPEN_WEATHER_MAP_ID);

        WeatherData weatherData = restTemplate.getForObject(builder.build(), WeatherData.class);

        return weatherData;

    }

    public static void main(String args[]) throws URISyntaxException, MalformedURLException
    {

        WeatherLoader weatherLoader = new WeatherLoader();

        WeatherData weatherData = weatherLoader.loadWeather();
        ToStringBuilder.setDefaultStyle(ToStringStyle.SHORT_PREFIX_STYLE);
        System.out.println(ToStringBuilder.reflectionToString(weatherData));
        System.out.println(ToStringBuilder.reflectionToString(weatherData.getBase()));
        System.out.println(ToStringBuilder.reflectionToString(weatherData.getClouds()));
        System.out.println(ToStringBuilder.reflectionToString(weatherData.getCod()));
        System.out.println(ToStringBuilder.reflectionToString(weatherData.getCoord()));
        System.out.println(ToStringBuilder.reflectionToString(weatherData.getMain()));
        System.out.println(ToStringBuilder.reflectionToString(weatherData.getSys()));
        weatherData.getWeather().forEach(w -> System.out.println(ToStringBuilder.reflectionToString(w)));
        System.out.println(ToStringBuilder.reflectionToString(weatherData.getWind()));

    }

}
