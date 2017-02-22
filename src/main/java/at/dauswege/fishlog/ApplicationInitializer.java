package at.dauswege.fishlog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import at.dauswege.fishlog.entity.Person;
import at.dauswege.fishlog.repository.rest.PersonRepository;

@Component
public class ApplicationInitializer implements ApplicationRunner {

  private final PersonRepository personRepository;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  public ApplicationInitializer(PersonRepository personRepository,
      BCryptPasswordEncoder bCryptPasswordEncoder) {
    super();
    this.personRepository = personRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @Override
  public void run(ApplicationArguments arg0) throws Exception {

    Person personDavid = new Person();
    personDavid.setFirstname("David");
    personDavid.setLastname("Ausweger");
    personDavid.setUsername("daus");
    personDavid.setMailAddress("daftinga@gmail.com");
    personDavid.setPassword(bCryptPasswordEncoder.encode("pwd"));
    personDavid = personRepository.save(personDavid);

    Person personWolfgang = new Person();
    personWolfgang.setFirstname("Wolfgang");
    personWolfgang.setLastname("Ausweger");
    personWolfgang.setUsername("waus");
    personWolfgang.setMailAddress("wolfang.ausweger@gmail.com");
    personWolfgang.setPassword(bCryptPasswordEncoder.encode("pwd"));
    personWolfgang = personRepository.save(personWolfgang);

  }

}
