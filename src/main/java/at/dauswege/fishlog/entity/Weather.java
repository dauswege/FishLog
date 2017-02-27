package at.dauswege.fishlog.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Weather
{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private String main;

    @Column
    private String description;

    @Column
    private String icon;

    @Column
    private Float temp;

    @Column
    private Integer pressure;

    @Column
    private Integer humidity;

    @Column
    private Integer visibility;

    @Column
    private Float windSpeed;

    @Column
    private Integer windDirection;

    @Column
    private Integer cloudiness;

    @Column
    private Integer cityId;

    @Column
    private String cityName;

}
