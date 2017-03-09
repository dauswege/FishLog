package at.dauswege.fishlog.dto;

import java.time.LocalTime;

import at.dauswege.fishlog.entity.Weather;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionDTO {

  private Long id;

  private Boolean manual;

  private LocalTime startTime;

  private LocalTime endTime;

  private Weather startWeather;

}
