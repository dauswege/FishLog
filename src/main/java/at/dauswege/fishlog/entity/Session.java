package at.dauswege.fishlog.entity;

import java.time.LocalTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  private Boolean manual;

  @Column
  @NotNull
  private LocalTime startTime;

  @Column
  private LocalTime endTime;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "start_weather_id")
  private Weather startWeather;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @NotNull
  private FishDay fishDay;

}
