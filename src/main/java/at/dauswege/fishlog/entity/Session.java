package at.dauswege.fishlog.entity;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Entity
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
  private LocalTime startTime;

  @Column
  private LocalTime endTime;

  @OneToOne
  @JoinColumn(name = "start_weather_id")
  private Weather startWeather;

  @ManyToOne
  @NotNull
  private FishDay fishDay;

}
