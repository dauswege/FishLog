package at.dauswege.fishlog.repository.rest;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import at.dauswege.fishlog.entity.Person;

@RepositoryRestResource
public interface PersonRepository extends CrudRepository<Person, Long> {
  public Person findOneByMailAddressOrUsername(String mailAddress, String username);

  @PreAuthorize("#id == authentication.principal")
  @Override
  public Person findOne(@Param("id") Long id);

  @Query("select p from Person p where p.id = ?#{authentication.principal}")
  public Person findMyPerson();
}
