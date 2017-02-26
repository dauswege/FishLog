package at.dauswege.fishlog.repository.rest;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import at.dauswege.fishlog.entity.FishDay;

// @RepositoryRestResource
@Repository
public interface FishDayRepository extends CrudRepository<FishDay, Long> {

  @Query("select fd from FishDay fd where fd.person.id = ?#{authentication.principal} and fd.day = :day")
  public FishDay findMyFishDay(@Param("day") LocalDate day);

}
