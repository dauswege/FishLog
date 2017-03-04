package at.dauswege.fishlog.entity;

import java.time.LocalTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.springframework.data.rest.core.annotation.RestResource;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RestResource
public class Fishing {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column
  @NotNull
  private Fish fish;

  @Column
  @NotNull
  private Integer length;

  @Column
  private Integer weight;

  @Column
  @NotNull
  private LocalTime fishingTime;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @NotNull
  private FishDay fishDay;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "weather_id")
  private Weather weather;

}
