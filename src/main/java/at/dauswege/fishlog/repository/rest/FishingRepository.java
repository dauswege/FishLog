package at.dauswege.fishlog.repository.rest;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import at.dauswege.fishlog.entity.Fishing;

@RepositoryRestResource
public interface FishingRepository extends CrudRepository<Fishing, Long>
{

}
