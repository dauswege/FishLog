package at.dauswege.fishlog.controller;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import at.dauswege.fishlog.entity.Fish;
import at.dauswege.fishlog.entity.FishDay;
import at.dauswege.fishlog.entity.Fishing;
import at.dauswege.fishlog.entity.Weather;
import at.dauswege.fishlog.repository.rest.FishDayRepository;
import at.dauswege.fishlog.repository.rest.FishingRepository;
import at.dauswege.fishlog.repository.rest.PersonRepository;
import at.dauswege.fishlog.service.WeatherLoader;
import at.dauswege.fishlog.weather.dto.WeatherData;

@RestController
public class GeneralController
{

    @Autowired
    private FishingRepository fishingRepository;

    @Autowired
    private FishDayRepository fishDayRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private WeatherLoader weatherLoader;

    @GetMapping("api/fishdays")
    public List<FishDay> getFishdays()
    {

        List<FishDay> fishDays = new ArrayList<>();
        Iterable<FishDay> fishDaysIterable = fishDayRepository.findAll();

        fishDaysIterable.forEach(fd -> fishDays.add(fd));

        return fishDays;
    }

    @GetMapping("api/fishday/{day}")
    public FishDay getFishDayByDay(
        @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day)
    {

        FishDay fishDay = this.fishDayRepository.findMyFishDay(day);
        return fishDay;

    }

    @PostMapping("api/fishdays")
    public void createOrUpdateFishDay(@RequestBody FishDay fishDay)
    {

        if (fishDay.getId() == null)
        {
            fishDay.setPerson(personRepository.findMyPerson());
        }

        if (fishDay.getId() == null)
        {

            fishDay.setWeather(this.getCurrentWeather());
        }

        fishDayRepository.save(fishDay);

    }

    @PostMapping("api/fishdays/{day}/fishings")
    public void createOrUpdateFishDay(
        @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day,
        @RequestBody Fishing fishing)
    {

        FishDay fishDay = fishDayRepository.findMyFishDay(day);
        if (fishDay == null)
        {
            fishDay = new FishDay(null, day, personRepository.findMyPerson(), null);
        }

        if (fishing.getId() == null)
        {
            fishing.setWeather(this.getCurrentWeather());
        }

        fishing.setFishDay(fishDay);
        fishingRepository.save(fishing);
    }

    @GetMapping("api/fishdays/{day}/fishings")
    public List<Fishing> getFishingsByDay(
        @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day)
    {

        List<Fishing> fishings = fishingRepository.findMyFishingsByDay(day);

        return fishings;
    }

    @GetMapping("api/fishings")
    public List<Fishing> getFishings()
    {

        List<Fishing> fishings = fishingRepository.findMyFishings();

        return fishings;
    }

    @DeleteMapping("api/fishings/{fishing}")
    public void deleteFishing(@PathVariable("fishing") Long id)
    {

        fishingRepository.delete(id);
    }

    @GetMapping("api/constants/fishes")
    public Fish[] getFishes()
    {

        return Fish.values();
    }

    private Weather getCurrentWeather()
    {
        Weather weather = null;
        try
        {

            WeatherData weatherData = weatherLoader.loadWeather();

            weather = new Weather();

            weather.setMain(weatherData.getWeather().get(0).getMain());
            weather.setDescription(weatherData.getWeather().get(0).getDescription());
            weather.setIcon(weatherData.getWeather().get(0).getIcon());
            weather.setCloudiness(weatherData.getClouds().getAll());
            weather.setVisibility(weatherData.getVisibility());

            weather.setTemp(weatherData.getMain().getTemp().floatValue());
            weather.setHumidity(weatherData.getMain().getHumidity());
            weather.setPressure(weatherData.getMain().getPressure());
            weather.setWindDirection(weatherData.getWind().getDeg());
            weather.setWindSpeed(weatherData.getWind().getSpeed().floatValue());

            weather.setCityId(weatherData.getId());
            weather.setCityName(weatherData.getName());

        }
        catch (MalformedURLException e)
        {
            e.printStackTrace();
        }
        catch (URISyntaxException e)
        {
            e.printStackTrace();
        }

        return weather;
    }

}
