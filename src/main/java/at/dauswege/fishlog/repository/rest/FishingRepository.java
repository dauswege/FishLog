package at.dauswege.fishlog.repository.rest;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import at.dauswege.fishlog.entity.Fishing;

// @RepositoryRestResource
@Repository
public interface FishingRepository extends CrudRepository<Fishing, Long> {

  @Query("select f from Fishing f "
      + "LEFT JOIN f.session s "
      + "LEFT JOIN s.fishDay fd "
      + "WHERE fd.person.id = ?#{authentication.principal} "
      + "AND fd.day = :day")
  public List<Fishing> findMyFishingsByDay(@Param("day") LocalDate day);

  @Query("select f from Fishing f "
      + "LEFT JOIN f.session s "
      + "LEFT JOIN s.fishDay fd "
      + "WHERE fd.person.id = ?#{authentication.principal}")
  public List<Fishing> findMyFishings();

  // @Query("select fd from FishDay fd where fd.person.id = ?#{authentication.principal} and fd.day
  // = :day")
  // public FishDay findMyFishDay(@Param("day") LocalDate day);

}
