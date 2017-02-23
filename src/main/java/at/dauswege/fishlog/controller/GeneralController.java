package at.dauswege.fishlog.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import at.dauswege.fishlog.entity.FishDay;
import at.dauswege.fishlog.repository.rest.FishDayRepository;

@RestController
public class GeneralController
{

    @Autowired
    private FishDayRepository fishDayRepository;

    @GetMapping("api/fishdays")
    public List<FishDay> getFishdays()
    {
        List<FishDay> fishDays = new ArrayList<>();
        Iterable<FishDay> fishDaysIterable = fishDayRepository.findAll();

        fishDaysIterable.forEach(fd -> fishDays.add(fd));

        return fishDays;
    }

}
