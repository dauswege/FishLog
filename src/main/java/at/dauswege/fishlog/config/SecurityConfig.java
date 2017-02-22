package at.dauswege.fishlog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.repository.query.spi.EvaluationContextExtension;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;

import at.dauswege.fishlog.service.UserAuthenticationProvider;

public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

    auth.authenticationProvider(authenticationProvider());
    auth.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    super.configure(http);
    http.csrf().disable();
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {

    return new UserAuthenticationProvider();
  }

  @Bean
  EvaluationContextExtension securityExtension() {

    return new SecurityEvaluationContextExtension();
  }

}
