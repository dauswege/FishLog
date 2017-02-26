package at.dauswege.fishlog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import at.dauswege.fishlog.entity.FishDay;
import at.dauswege.fishlog.entity.Person;
import at.dauswege.fishlog.repository.rest.PersonRepository;

@Component
@RepositoryEventHandler(FishDay.class)
public class FishingDayEventHandler {

  @Autowired
  private PersonRepository personRepository;

  @HandleBeforeCreate
  public void applyUserInformationUsingSecurityContext(FishDay fishDay) {

    Person p = personRepository.findMyPerson();
    fishDay.setPerson(p);
    // System.out.println(authentication);
  }

}
