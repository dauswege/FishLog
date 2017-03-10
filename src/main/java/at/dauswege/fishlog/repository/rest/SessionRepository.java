package at.dauswege.fishlog.repository.rest;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import at.dauswege.fishlog.entity.FishDay;
import at.dauswege.fishlog.entity.Session;

public interface SessionRepository extends CrudRepository<Session, Long> {

  @Query("select s from Session s "
      + "left join fetch s.fishDay fd "
      + "where fd.person.id = ?#{authentication.principal}")
  public List<Session> findMySessions();

  @Query("select s from Session s "
      + "left join s.fishDay fd "
      + "where fd.day = :day "
      + "and fd.person.id = ?#{authentication.principal}")
  public List<FishDay> findSessionByFishDay(@Param("day") LocalDate day);

  @Query("select s from Session s "
      + "left join s.fishDay fd "
      + "where fd.day = :day "
      + "and s.endTime is null "
      + "and fd.person.id = ?#{authentication.principal}")
  public Session findMyOpenSessionByDay(@Param("day") LocalDate day);

}
