package at.dauswege.fishlog.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class FishDaySessionsDTO {

  private LocalDate day;

  private List<SessionDTO> sessions = new ArrayList<>();

}
