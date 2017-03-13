package at.dauswege.fishlog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import at.dauswege.fishlog.entity.FishDay;
import at.dauswege.fishlog.entity.Fishing;
import at.dauswege.fishlog.entity.Session;

@Configuration
public class RestRepositoryConfig extends RepositoryRestConfigurerAdapter {

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

    config.exposeIdsFor(Fishing.class, Session.class, FishDay.class);
  }

}
